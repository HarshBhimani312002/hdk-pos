import {
  AlertTriangle,
  Package,
  ArrowUpRight,
} from "lucide-react";

const products = [
  {
    name: "Milk",
    stock: 4,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Bread",
    stock: 8,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Cold Drink",
    stock: 2,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Chocolate",
    stock: 6,
    color: "bg-yellow-100 text-yellow-700",
  },
];

const LowStock = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Low Stock
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Products requiring attention
          </p>
        </div>

        <button className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100">
          <ArrowUpRight size={18} />
        </button>
      </div>

      {/* Products */}
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                <Package
                  size={20}
                  className="text-orange-600"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="text-xs text-slate-500">
                  Remaining Stock
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${product.color}`}
              >
                {product.stock} Left
              </span>

              <AlertTriangle
                size={18}
                className="text-orange-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStock;