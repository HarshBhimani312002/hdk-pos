import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import { getSales } from "../../services/salesService";
import { getInvoice, getInvoiceItems } from "../../services/invoiceService";
import { downloadInvoicePDF } from "../../services/pdfService";

import type { Sale } from "../../types/sale";

const SalesHistory = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedMonth, setSelectedMonth] = useState("all");

  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 2;

  const navigate = useNavigate();

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
    </div>
  );
};

export default SalesHistory;
