interface InvoiceHeaderProps {
  invoiceNumber: string;
  customerName: string | null;
  paymentMethod: string;
  createdAt: string;
}

const InvoiceHeader = ({
  invoiceNumber,
  customerName,
  paymentMethod,
  createdAt,
}: InvoiceHeaderProps) => {
  return (
    <div className="print-card rounded-xl bg-white p-6 shadow">
      {/* Store Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-900">
          HDK POS
        </h1>

        <p className="text-sm text-gray-500">
          Retail Management System
        </p>
      </div>

      {/* Invoice Details */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p>
            <span className="font-semibold">
              Invoice No:
            </span>{" "}
            {invoiceNumber}
          </p>

          <p>
            <span className="font-semibold">
              Customer:
            </span>{" "}
            {customerName || "Walk-in Customer"}
          </p>
        </div>

        <div className="space-y-2 md:text-right">
          <p>
            <span className="font-semibold">
              Payment:
            </span>{" "}
            {paymentMethod}
          </p>

          <p>
            <span className="font-semibold">
              Date:
            </span>{" "}
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;