import type { InventoryTransaction } from "../../types/inventory";

interface InventoryTableProps {
  transactions: InventoryTransaction[];
  loading: boolean;
}

const InventoryTable = ({
  transactions,
  loading,
}: InventoryTableProps) => {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-500">Loading inventory transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-700">
          No Inventory Transactions
        </h3>

        <p className="mt-2 text-slate-500">
          Inventory transactions will appear here after you create one.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-700">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Qty</th>
              <th className="px-6 py-4">Previous</th>
              <th className="px-6 py-4">New</th>
              <th className="px-6 py-4">Staff</th>
              <th className="px-6 py-4">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-slate-100 last:border-none hover:bg-slate-50"
              >
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(transaction.created_at).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 font-medium text-slate-800">
                  {transaction.product_name}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      transaction.transaction_type === "IN"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.transaction_type}
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold">
                  {transaction.quantity}
                </td>

                <td className="px-6 py-4">
                  {transaction.previous_stock}
                </td>

                <td className="px-6 py-4 font-semibold">
                  {transaction.new_stock}
                </td>

                <td className="px-6 py-4">
                  {transaction.performed_by}
                </td>

                <td className="px-6 py-4 text-slate-500">
                  {transaction.remarks || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;