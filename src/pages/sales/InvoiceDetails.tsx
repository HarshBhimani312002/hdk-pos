import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import { ArrowLeft } from "lucide-react";

import InvoiceHeader from "../../components/invoice/InvoiceHeader";
import InvoiceItems from "../../components/invoice/InvoiceItems";
import InvoiceSummary from "../../components/invoice/InvoiceSummary";
import InvoiceActions from "../../components/invoice/InvoiceActions";

import {
  getInvoice,
  getInvoiceItems,
} from "../../services/invoiceService";
import { downloadInvoicePDF } from "../../services/pdfService";

import type {
  Invoice,
  InvoiceItem,
} from "../../types/invoice";

import "../../styles/print.css";

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      loadInvoice(id);
    }
  }, [id]);

  const loadInvoice = async (invoiceId: string) => {
    try {
      const invoiceData = await getInvoice(invoiceId);
      const invoiceItems = await getInvoiceItems(invoiceId);

      setInvoice(invoiceData);
      setItems(invoiceItems);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load invoice.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: invoice?.invoice_number ?? "Invoice",
  });

  const handleDownloadPDF = () => {
    if (!invoice) return;

    downloadInvoicePDF(invoice, items);

    toast.success("Invoice PDF downloaded successfully.");
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-gray-500">
          Loading invoice...
        </p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-red-500">
          Invoice not found.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Back Button */}
      <div className="no-print mb-6">
        <button
          onClick={() => navigate("/sales")}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back to Sales History
        </button>
      </div>

      {/* Printable Content */}
      <div
        ref={invoiceRef}
        className="print-container space-y-6"
      >
        <InvoiceHeader
          invoiceNumber={invoice.invoice_number}
          customerName={invoice.customer_name}
          paymentMethod={invoice.payment_method}
          createdAt={invoice.created_at}
        />

        <InvoiceItems items={items} />

        <InvoiceSummary
          subtotal={invoice.subtotal}
          discount={invoice.discount}
          tax={invoice.tax}
          total={invoice.total}
        />
      </div>

      {/* Actions */}
      <div className="no-print mt-6">
        <InvoiceActions
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
        />
      </div>
    </>
  );
};

export default InvoiceDetails;