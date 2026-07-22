import type { CartItem } from "../../types/billing";
import { Plus, Minus, Trash2, Package } from "lucide-react";

interface CartProps {
  cart: CartItem[];
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

const Cart = ({ cart, onIncrease, onDecrease, onRemove }: CartProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Shopping Cart</h2>

          <p className="mt-1 text-sm text-slate-500">
            Review selected products before billing.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {cart.length} ITEMS
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
          <Package size={42} className="mb-3 text-slate-400" />

          <p className="text-lg font-semibold text-slate-600">Cart is empty</p>

          <p className="mt-1 text-sm text-slate-400">
            Add products to start billing.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-500 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {/* Product Icon */}
                <div className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl sm:mx-0">
                  📦
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  {/* Product Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-bold text-slate-800">
                        {item.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <Package size={15} />

                        <span>₹{item.price.toFixed(2)} each</span>

                        <span>•</span>

                        <span>Stock: {item.stock}</span>
                      </div>

                      {item.stock <= 5 && (
                        <div className="mt-3 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Low Stock
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mt-5 flex items-center justify-between sm:justify-center gap-3">
                    <button
                      onClick={() => onDecrease(item.productId)}
                      className="rounded-xl border border-slate-300 p-2 transition hover:bg-slate-100"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-[35px] text-center text-lg font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => onIncrease(item.productId)}
                      className="rounded-xl border border-blue-200 bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {/* Remove */}
                  <div className="mt-5 flex justify-center">
                    <button
                      onClick={() => onRemove(item.productId)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              {/* Total */}
              <div className="mt-5 -mx-5 border-t border-slate-200 px-5 pt-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-base font-semibold text-slate-600">
                    Total
                  </span>

                  <span className="text-xl font-bold text-blue-600 sm:text-3xl">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
