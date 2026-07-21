import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getPermissions } from "../../utils/permissions";
import toast from "react-hot-toast";
import { addProduct, updateProduct } from "../../services/productService";

import type { Product, ProductFormData } from "../../types/product";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onProductAdded: () => void;
  product: Product | null;
  isEditing: boolean;
}

const ProductModal = ({
  open,
  onClose,
  onProductAdded,
  product,
  isEditing,
}: ProductModalProps) => {
  const [loading, setLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const permissions = getPermissions(currentUser.role);

  const initialFormData: ProductFormData = {
    product_name: "",
    category: "General",
    selling_price: "",
    cost_price: "",
    stock: "0",
    min_stock: "",
    image_url: "",
    status: "Active",
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  useEffect(() => {
    if (isEditing && product) {
      setFormData({
        product_name: product.product_name,
        category: product.category,
        selling_price: product.selling_price.toString(),
        cost_price: product.cost_price.toString(),
        stock: product.stock.toString(),
        min_stock: product.min_stock.toString(),
        status: product.status,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [product, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async () => {
    if (!permissions.canManageProducts) {
      toast.error("Only the owner can manage products.");
      return;
    }
    if (!formData.product_name.trim()) {
      toast.error("Product Name is required.");
      return;
    }

    try {
      setLoading(true);
      const productData = {
        ...formData,
        selling_price: Number(formData.selling_price),
        cost_price: Number(formData.cost_price),
        stock: product?.stock ?? 0,
        min_stock: Number(formData.min_stock),
        store_name: currentUser.store_name,
      };

      if (isEditing && product) {
        await updateProduct(product.id, productData);
      } else {
        await addProduct(productData);
      }

      resetForm();

      onClose();

      onProductAdded();
      toast.success(
        isEditing
          ? "Product updated successfully."
          : "Product added successfully.",
      );
    } catch (error) {
      console.error(
        isEditing ? "Error updating product:" : "Error adding product:",
        error,
      );

      toast.error(
        isEditing ? "Failed to update product." : "Failed to add product.",
      );
    } finally {
      setLoading(false);
    }
  };
  if (!permissions.canManageProducts) {
    return null;
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Update the product details below."
                : "Fill in the details below to create a new product."}
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            disabled={loading}
            className="rounded-xl p-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Product Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Name
              </label>

              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category{" "}
                <span className="text-xs font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="General">General</option>
                <option value="Grocery">Grocery</option>
                <option value="Beverages">Beverages</option>
                <option value="Dairy">Dairy</option>
                <option value="Snacks">Snacks</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Stationery">Stationery</option>
                <option value="Electronics">Electronics</option>
                <option value="Mobile">Mobile</option>
                <option value="Accessories">Accessories</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Selling Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Selling Price
              </label>

              <input
                type="number"
                name="selling_price"
                value={formData.selling_price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Cost Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Cost Price
              </label>

              <input
                type="number"
                name="cost_price"
                value={formData.cost_price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Minimum Stock */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Minimum Stock
              </label>

              <input
                type="number"
                name="min_stock"
                value={formData.min_stock}
                onChange={handleChange}
                placeholder=""
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-6 py-5 sm:flex-row sm:justify-end">
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            disabled={loading}
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Saving..."
              : isEditing
                ? "Update Product"
                : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
