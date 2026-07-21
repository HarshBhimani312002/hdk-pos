import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import {
  addInventoryTransaction,
  getProductById,
  updateProductStock,
} from "../../services/inventoryService";

import type { Product } from "../../types/product";
import { getPermissions } from "../../utils/permissions";

interface InventoryModalProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
  onTransactionAdded: () => Promise<void>;
}

const InventoryModal = ({
  open,
  onClose,
  products,
  onTransactionAdded,
}: InventoryModalProps) => {
  const [productId, setProductId] = useState("");

  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const permissions = getPermissions(currentUser.role);
  const [saving, setSaving] = useState(false);
  const [transactionType, setTransactionType] = useState<"IN" | "OUT">(
    permissions.canStockIn ? "IN" : "OUT",
  );

  useEffect(() => {
    if (!open) {
      setProductId("");
      setTransactionType(permissions.canStockIn ? "IN" : "OUT");
      setQuantity("");
      setRemarks("");
      setSaving(false);
    }
  }, [open]);

  const handleSave = async () => {
    // RBAC Validation
    if (!permissions.canStockIn && transactionType === "IN") {
      toast.error("Only the owner can perform Stock In.");
      return;
    }
    if (!productId) {
      toast.error("Please select a product.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    try {
      setSaving(true);

      const product = await getProductById(productId);

      const qty = Number(quantity);

      let newStock = product.stock;

      if (transactionType === "IN") {
        newStock = product.stock + qty;
      } else {
        if (qty > product.stock) {
          toast.error("Insufficient stock.");
          return;
        }

        newStock = product.stock - qty;
      }

      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}",
      );

      console.log(currentUser);

      await updateProductStock(product.id, newStock);

      await addInventoryTransaction({
        product_id: product.id,
        product_name: product.product_name,
        transaction_type: transactionType,
        quantity: qty,
        previous_stock: product.stock,
        new_stock: newStock,
        remarks,
        performed_by: currentUser.username,
        store_name: currentUser.store_name,
      });

      await onTransactionAdded();

      onClose();

      toast.success("Inventory updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Inventory Transaction
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          {/* Product */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Product
            </label>

            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select Product</option>

              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Transaction Type
            </label>

            <select
              value={transactionType}
              onChange={(e) =>
                setTransactionType(e.target.value as "IN" | "OUT")
              }
              className="w-full rounded-2xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {permissions.canStockIn && <option value="IN">Stock In</option>}

              <option value="OUT">Stock Out</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full rounded-2xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Remarks
            </label>

            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Optional remarks..."
              className="w-full rounded-2xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-300 px-5 py-2 font-semibold transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2 font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryModal;
