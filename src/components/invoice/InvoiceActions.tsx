interface InvoiceActionsProps {
  onDownloadPDF: () => void;
  onPrint: () => void;
}

const InvoiceActions = ({
  onDownloadPDF,
  onPrint,
}: InvoiceActionsProps) => {
  return (
    <div className="flex flex-wrap justify-end gap-3">
      <button
        onClick={onDownloadPDF}
        className="rounded-lg bg-green-600 px-6 py-2 font-medium text-white transition hover:bg-green-700"
      >
        Download PDF
      </button>

      <button
        onClick={onPrint}
        className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Print Invoice
      </button>
    </div>
  );
};

export default InvoiceActions;