import { Edit, Trash2 } from "lucide-react";
import { getPermissions } from "../../utils/permissions";
import type { Product } from "../../types/product";
import { useUser } from "../../context/UserContext";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductTable = ({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const { user } = useUser();

  const permissions = getPermissions(user?.role ?? "");

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <p className="text-slate-500">Loading products...</p>
      </div>
    );
  }

 if (products.length === 0) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
      <p className="text-lg font-semibold text-slate-700">
        No products match your search.
      </p>

      <p className="mt-2 text-slate-500">
        Try searching with a different product name or Product ID.
      </p>
    </div>
  );
}

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

             {permissions.canManageProducts && (
  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
    Actions
  </th>
)}
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-slate-200 transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">
                    {product.product_name}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    Product ID: #{product.id.slice(0, 8)}
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold text-slate-800">
                  ₹{Number(product.selling_price).toLocaleString()}
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

                {permissions.canManageProducts && (
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(product)}
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(product)}
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                      >
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