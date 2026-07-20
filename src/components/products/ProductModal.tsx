import { X } from "lucide-react";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
}

const ProductModal = ({ open, onClose }: ProductModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Add Product
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fill in the details below to create a new product.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
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
                defaultValue="General"
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
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Stock
              </label>

              <input
                type="number"
                placeholder="0"
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
                placeholder="5"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                defaultValue="Active"
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
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-90">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;