import type { InvoiceItem } from "../../types/invoice";

interface InvoiceItemsProps {
  items: InvoiceItem[];
}

const InvoiceItems = ({
  items,
}: InvoiceItemsProps) => {
  return (
    <div className="print-card rounded-xl bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-semibold">
        Purchased Items
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">
                Product
              </th>

              <th className="px-4 py-3 text-center">
                Qty
              </th>

              <th className="px-4 py-3 text-right">
                Price
              </th>

              <th className="px-4 py-3 text-right">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-gray-500"
                >
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {item.products.product_name}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {item.quantity}
                  </td>

                  <td className="px-4 py-3 text-right">
                    ₹{item.price.toFixed(2)}
                  </td>

                  <td className="px-4 py-3 text-right font-semibold">
                    ₹{item.total.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceItems;