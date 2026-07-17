import { ArrowUpRight } from "lucide-react";

const orders = [
  {
    id: "#1001",
    customer: "Rahul Patel",
    amount: "₹1,250",
    status: "Paid",
  },
  {
    id: "#1002",
    customer: "Neha Shah",
    amount: "₹860",
    status: "Pending",
  },
  {
    id: "#1003",
    customer: "Amit Kumar",
    amount: "₹2,430",
    status: "Paid",
  },
  {
    id: "#1004",
    customer: "Priya Mehta",
    amount: "₹540",
    status: "Pending",
  },
];

const RecentOrders = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest customer orders
          </p>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 sm:w-auto">
          View All
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="min-w-[650px] w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Order
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Amount
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-5 py-4 font-semibold text-slate-900">
                  {order.id}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {order.customer}
                </td>

                <td className="px-5 py-4 font-semibold text-slate-900">
                  {order.amount}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;