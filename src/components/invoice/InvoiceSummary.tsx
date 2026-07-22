interface InvoiceSummaryProps {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

const InvoiceSummary = ({
  subtotal,
  discount,
  tax,
  total,
}: InvoiceSummaryProps) => {
  return (
    <div className="print-card rounded-xl bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-semibold">
        Invoice Summary
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-medium">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Discount
          </span>

          <span className="font-medium text-red-600">
            - ₹{discount.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Tax
          </span>

          <span className="font-medium">
            ₹{tax.toFixed(2)}
          </span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span className="text-blue-600">
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;