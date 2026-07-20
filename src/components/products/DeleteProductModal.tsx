import { AlertTriangle } from "lucide-react";

import type { Product } from "../../types/product";

interface DeleteProductModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteProductModal = ({
  open,
  product,
  onClose,
  onConfirm,
}: DeleteProductModalProps) => {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle size={32} className="text-red-600" />
        </div>

        {/* Title */}
        <h2 className="mt-5 text-center text-2xl font-bold text-slate-900">
          Delete Product
        </h2>

        {/* Message */}
        <p className="mt-3 text-center text-slate-600">
          Are you sure you want to delete
        </p>

        <p className="mt-2 text-center text-lg font-semibold text-slate-900">
          "{product.product_name}"
        </p>

        <p className="mt-3 text-center text-sm text-red-500">
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;