import type { CartItem } from "../../types/billing";
import {
  Plus,
  Minus,
  Trash2,
  Package,
} from "lucide-react";

interface CartProps {
  cart: CartItem[];
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

const Cart = ({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
}: CartProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 text-lg font-semibold">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          Cart is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Left Section */}
              <div className="flex-1">
                <p className="text-lg font-semibold">
                  {item.name}
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <Package size={15} />

                  <span>
                    ₹{item.price.toFixed(2)} each
                  </span>

                  <span>|</span>

                  <span>
                    Stock: {item.stock}
                  </span>
                </div>

                {item.stock <= 5 && (
                  <div className="mt-2 inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    Low Stock
                  </div>
                )}

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() =>
                      onDecrease(item.productId)
                    }
                    className="rounded-lg border p-2 transition hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-8 text-center text-lg font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      onIncrease(item.productId)
                    }
                    className="rounded-lg border p-2 transition hover:bg-blue-50"
                  >
                    <Plus size={16} />
                  </button>

                  <button
                    onClick={() =>
                      onRemove(item.productId)
                    }
                    className="ml-2 rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                    title="Remove Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Right Section */}
              <div className="text-left sm:ml-5 sm:text-right">
                <p className="text-lg font-bold">
                  ₹
                  {(
                    item.price * item.quantity
                  ).toFixed(2)}
                </p>

                <p className="text-xs text-gray-500">
                  Total
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;