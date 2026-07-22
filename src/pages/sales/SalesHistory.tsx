import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import { getSales, deleteMonthlySales } from "../../services/salesService";
import { getInvoice, getInvoiceItems } from "../../services/invoiceService";
import { downloadInvoicePDF } from "../../services/pdfService";
import { getPermissions } from "../../utils/permissions";

import type { Sale } from "../../types/sale";

const SalesHistory = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedMonth, setSelectedMonth] = useState("all");

  const [selectedYear, setSelectedYear] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const permissions = getPermissions(currentUser.role);

  useEffect(() => {
    loadSales();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedMonth, selectedYear]);

  const loadSales = async () => {
    try {
      const data = await getSales();
      setSales(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load sales.");
    }
  };

  const handleDownloadPDF = async (saleId: string) => {
    try {
      setDownloadingId(saleId);

      const invoice = await getInvoice(saleId);

      const items = await getInvoiceItems(saleId);

      downloadInvoicePDF(invoice, items);

      toast.success("Invoice downloaded successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to download invoice.");
    } finally {
      setDownloadingId(null);
    }
  };
  const handleDeleteMonthlySales = async () => {
    try {
      await deleteMonthlySales(Number(selectedMonth), Number(selectedYear));

      toast.success("Monthly sales deleted successfully.");

      loadSales();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete monthly sales.");
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [
    ...new Set(
      sales.map((sale) => new Date(sale.created_at).getFullYear().toString()),
    ),
  ].sort((a, b) => Number(b) - Number(a));

  const filteredSales = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return sales.filter((sale) => {
      const customer = (sale.customer_name ?? "Walk-in Customer").toLowerCase();

      const matchesSearch =
        sale.invoice_number.toLowerCase().includes(search) ||
        customer.includes(search) ||
        sale.payment_method.toLowerCase().includes(search);

      const saleDate = new Date(sale.created_at);

      const matchesMonth =
        selectedMonth === "all" ||
        saleDate.getMonth() === Number(selectedMonth);

      const matchesYear =
        selectedYear === "all" ||
        saleDate.getFullYear() === Number(selectedYear);

      return matchesSearch && matchesMonth && matchesYear;
    });
  }, [sales, searchTerm, selectedMonth, selectedYear]);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredSales.length / ITEMS_PER_PAGE),
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedSales = filteredSales.slice(startIndex, endIndex);

  const showingFrom = filteredSales.length === 0 ? 0 : startIndex + 1;

  const showingTo = Math.min(endIndex, filteredSales.length);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sales History</h1>

          <p className="text-gray-500">View all generated invoices.</p>
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row lg:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search invoice, customer or payment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-4 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Month Filter */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
          >
            <option value="all">All Months</option>

            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
          >
            <option value="all">All Years</option>

            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {permissions.canDeleteMonthlySales && (
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={selectedMonth === "all" || selectedYear === "all"}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Delete Monthly Records
            </button>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Invoice</th>

                <th className="px-4 py-3 text-left">Customer</th>

                <th className="px-4 py-3 text-left">Payment</th>

                <th className="px-4 py-3 text-left">Total</th>

                <th className="px-4 py-3 text-left">Date</th>

                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500">
                    No sales found.
                  </td>
                </tr>
              ) : (
                paginatedSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-t transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {sale.invoice_number}
                    </td>

                    <td className="px-4 py-3">
                      {sale.customer_name ?? "Walk-in Customer"}
                    </td>

                    <td className="px-4 py-3">{sale.payment_method}</td>

                    <td className="px-4 py-3 font-semibold">
                      Rs. {sale.total.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(sale.created_at).toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => navigate(`/sales/${sale.id}`)}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDownloadPDF(sale.id)}
                          disabled={downloadingId === sale.id}
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {downloadingId === sale.id
                            ? "Downloading..."
                            : "Download"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t bg-gray-50 px-4 py-3 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
          <span>
            Showing <span className="font-semibold">{showingFrom}</span>-
            <span className="font-semibold">{showingTo}</span> of{" "}
            <span className="font-semibold">{filteredSales.length}</span>{" "}
            invoices
          </span>

          {(selectedMonth !== "all" ||
            selectedYear !== "all" ||
            searchTerm) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedMonth("all");
                setSelectedYear("all");
              }}
              className="rounded-lg border border-gray-300 px-3 py-1 text-sm transition hover:bg-gray-100"
            >
              Clear Filters
            </button>
          )}
        </div>
        {filteredSales.length > ITEMS_PER_PAGE && (
          <div className="flex flex-col items-center justify-between gap-4 border-t bg-white px-4 py-4 md:flex-row">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← Previous
            </button>

            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => goToPage(index + 1)}
                  className={`h-10 w-10 rounded-lg border ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        )}
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-red-600">
              Delete Monthly Records
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              This action will permanently delete all invoices for:
            </p>

            <div className="mt-4 rounded-lg bg-gray-100 p-3">
              <p>
                <strong>Month:</strong> {months[Number(selectedMonth)]}
              </p>

              <p>
                <strong>Year:</strong> {selectedYear}
              </p>
            </div>

            <p className="mt-4 text-sm font-medium">
              Type <span className="text-red-600">DELETE</span> to continue.
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="mt-2 w-full rounded-lg border px-3 py-2 outline-none focus:border-red-500"
              placeholder="Type DELETE"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmText("");
                }}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleDeleteMonthlySales();
                  setShowDeleteModal(false);
                  setConfirmText("");
                }}
                disabled={confirmText !== "DELETE"}
                className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesHistory;
