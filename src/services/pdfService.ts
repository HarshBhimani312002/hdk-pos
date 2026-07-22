import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type {
  Invoice,
  InvoiceItem,
} from "../types/invoice";

const formatCurrency = (amount: number): string =>
  `Rs. ${amount.toFixed(2)}`;

export const downloadInvoicePDF = (
  invoice: Invoice,
  items: InvoiceItem[],
) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("HDK POS", 14, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Retail Management System", 14, 27);

  // Invoice Information
  doc.setFontSize(11);

  doc.text(
    `Invoice No: ${invoice.invoice_number}`,
    14,
    42,
  );

  doc.text(
    `Customer: ${
      invoice.customer_name || "Walk-in Customer"
    }`,
    14,
    50,
  );

  doc.text(
    `Payment: ${invoice.payment_method}`,
    14,
    58,
  );

  doc.text(
    `Date: ${new Date(
      invoice.created_at,
    ).toLocaleString()}`,
    14,
    66,
  );

  // Products Table
  autoTable(doc, {
    startY: 78,

    head: [["Product", "Qty", "Price", "Total"]],

    body: items.map((item) => [
      item.products.product_name,
      item.quantity.toString(),
      formatCurrency(item.price),
      formatCurrency(item.total),
    ]),

    theme: "grid",

    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  const finalY =
    (doc as jsPDF & {
      lastAutoTable?: { finalY: number };
    }).lastAutoTable?.finalY ?? 90;

  doc.setFontSize(12);

  doc.text(
    `Subtotal : ${formatCurrency(invoice.subtotal)}`,
    140,
    finalY + 15,
  );

  doc.text(
    `Discount : ${formatCurrency(invoice.discount)}`,
    140,
    finalY + 23,
  );

  doc.text(
    `Tax : ${formatCurrency(invoice.tax)}`,
    140,
    finalY + 31,
  );

  doc.setFont("helvetica", "bold");

  doc.text(
    `Total : ${formatCurrency(invoice.total)}`,
    140,
    finalY + 43,
  );

  doc.setFont("helvetica", "normal");

  doc.text(
    "Thank you for shopping with us!",
    14,
    finalY + 60,
  );

  doc.save(`${invoice.invoice_number}.pdf`);
};