import { Edit, Trash2 } from "lucide-react";
import { useUser } from "../../context/UserContext";

const dummyProducts = [
  {
    id: 1001,
    name: "iPhone 16 Pro",
    price: 99999,
    stock: 15,
    status: "Active",
  },
  {
    id: 1002,
    name: "Samsung S25 Ultra",
    price: 89999,
    stock: 10,
    status: "Active",
  },
  {
    id: 1003,
    name: "AirPods Pro",
    price: 24999,
    stock: 6,
    status: "Low Stock",
  },
  {
    id: 1004,
    name: "Dell XPS 15",
    price: 165000,
    stock: 3,
    status: "Low Stock",
  },
];

const ProductTable = () => {
  const { user } = useUser();

  const isOwner = user?.role === "owner";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Stock
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              {isOwner && (
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {dummyProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t border-slate-200 transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">
                    {product.name}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    Product ID: #{product.id}
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold text-slate-800">
                  ₹{product.price.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-slate-700">
                  {product.stock}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                {isOwner && (
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200">
                        <Edit size={18} />
                      </button>

                      <button className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;