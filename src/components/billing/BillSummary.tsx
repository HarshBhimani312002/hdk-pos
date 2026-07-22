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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Bill Summary</h2>

        <p className="mt-1 text-sm text-slate-500">
          Review customer details and payment before generating the bill.
        </p>
      </div>

      {/* Customer Details */}
      <div className="mb-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Customer Name
          </label>

          <input
            type="text"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            placeholder="Walk-in Customer"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) => onPaymentMethodChange(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option value="Cash">💵 Cash</option>
            <option value="Card">💳 Card</option>
            <option value="UPI">📱 UPI</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 p-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-slate-600">
            <span>Subtotal</span>
            <span className="text-sm font-semibold sm:text-base">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span>Discount</span>
            <span className="text-sm font-semibold text-green-600 sm:text-base">
              ₹{discount.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span>Tax</span>
            <span className="text-sm font-semibold sm:text-base">
              ₹{tax.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-slate-800 sm:text-lg">
                Total
              </span>

              <span className="text-2xl font-bold text-blue-600 sm:text-3xl">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onGenerateBill}
        disabled={subtotal === 0}
        className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        🧾 Generate Bill
      </button>
    </div>
  );
};

export default BillSummary;
