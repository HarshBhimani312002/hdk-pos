interface BillSummaryProps {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;

  customerName: string;
  onCustomerNameChange: (value: string) => void;

  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;

  onGenerateBill: () => void;
}

const BillSummary = ({
  subtotal,
  discount,
  tax,
  total,

  customerName,
  onCustomerNameChange,

  paymentMethod,
  onPaymentMethodChange,

  onGenerateBill,
}: BillSummaryProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 text-lg font-semibold">
        Bill Summary
      </h2>

      {/* Customer Details */}
      <div className="mb-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Customer Name
          </label>

          <input
            type="text"
            value={customerName}
            onChange={(e) =>
              onCustomerNameChange(e.target.value)
            }
            placeholder="Walk-in Customer"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              onPaymentMethodChange(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>₹{discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button
          onClick={onGenerateBill}
          disabled={subtotal === 0}
          className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Generate Bill
        </button>
      </div>
    </div>
  );
};

export default BillSummary;