import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import InventoryTable from "../../components/inventory/InventoryTable";
import InventoryModal from "../../components/inventory/InventoryModal";

import type { InventoryTransaction } from "../../types/inventory";
import type { Product } from "../../types/product";

import { getProducts } from "../../services/productService";
import { getInventoryTransactions } from "../../services/inventoryService";
import { getPermissions } from "../../utils/permissions";

const InventoryPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "IN" | "OUT">("ALL");
  const [dateFilter, setDateFilter] = useState<
    "ALL" | "TODAY" | "7_DAYS" | "30_DAYS" | "THIS_MONTH"
  >("ALL");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

const permissions = getPermissions(currentUser.role);
  const fetchInventoryData = async () => {
    try {
      setLoading(true);

      const [productData, transactionData] = await Promise.all([
        getProducts(),
        getInventoryTransactions(),
      ]);

      setProducts(productData);
      setTransactions(transactionData);
    } catch (error) {
      console.error("Error loading inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.product_name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "ALL" || transaction.transaction_type === typeFilter;

      const transactionDate = new Date(transaction.created_at);
      const today = new Date();

      let matchesDate = true;

      switch (dateFilter) {
        case "TODAY":
          matchesDate = transactionDate.toDateString() === today.toDateString();
          break;

        case "7_DAYS": {
          const last7Days = new Date();
          last7Days.setDate(today.getDate() - 7);
          matchesDate = transactionDate >= last7Days;
          break;
        }

        case "30_DAYS": {
          const last30Days = new Date();
          last30Days.setDate(today.getDate() - 30);
          matchesDate = transactionDate >= last30Days;
          break;
        }

        case "THIS_MONTH":
          matchesDate =
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear();
          break;

        default:
          matchesDate = true;
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [transactions, search, typeFilter, dateFilter]);
  useEffect(() => {
    setCurrentPage(1);
  }, [search, typeFilter, dateFilter]);

  // Analytics
  const totalStockIn = filteredTransactions
    .filter((transaction) => transaction.transaction_type === "IN")
    .reduce((sum, transaction) => sum + transaction.quantity, 0);

  const totalStockOut = filteredTransactions
    .filter((transaction) => transaction.transaction_type === "OUT")
    .reduce((sum, transaction) => sum + transaction.quantity, 0);

  const netMovement = totalStockIn - totalStockOut;

  const lastTransaction =
    filteredTransactions.length > 0 ? filteredTransactions[0] : null;
  const clearFilters = () => {
    setSearch("");
    setTypeFilter("ALL");
    setDateFilter("ALL");
  };
  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const paginatedTransactions = filteredTransactions.slice(
    indexOfFirstRow,
    indexOfLastRow,
  );

  return (
    <>
      <div className="space-y-6 lg:space-y-8">
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                Inventory Management
              </div>

              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                Inventory
              </h1>

              <p className="mt-2 text-slate-500">
                Manage stock movements and inventory transactions.
              </p>
            </div>

            {permissions.canStockOut && (
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                <Plus size={18} />
                New Transaction
              </button>
            )}
          </div>

          {/* Inventory Summary */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Total Products</p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {products.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
              <p className="text-sm text-yellow-700">Low Stock</p>

              <h2 className="mt-2 text-3xl font-bold text-yellow-700">
                {
                  products.filter(
                    (product) =>
                      product.stock > 0 && product.stock <= product.min_stock,
                  ).length
                }
              </h2>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
              <p className="text-sm text-red-700">Out of Stock</p>

              <h2 className="mt-2 text-3xl font-bold text-red-700">
                {products.filter((product) => product.stock === 0).length}
              </h2>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
              <p className="text-sm text-blue-700">Transactions</p>

              <h2 className="mt-2 text-3xl font-bold text-blue-700">
                {transactions.length}
              </h2>
            </div>
          </div>

          {/* Analytics */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
              <p className="text-sm text-green-700">Total Stock In</p>

              <h2 className="mt-2 text-3xl font-bold text-green-700">
                {totalStockIn}
              </h2>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
              <p className="text-sm text-red-700">Total Stock Out</p>

              <h2 className="mt-2 text-3xl font-bold text-red-700">
                {totalStockOut}
              </h2>
            </div>

            <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm">
              <p className="text-sm text-cyan-700">Net Movement</p>

              <h2 className="mt-2 text-3xl font-bold text-cyan-700">
                {netMovement >= 0 ? "+" : ""}
                {netMovement}
              </h2>
            </div>

            <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5 shadow-sm">
              <p className="text-sm text-purple-700">Last Transaction</p>

              <h2 className="mt-2 text-lg font-bold text-purple-700">
                {lastTransaction
                  ? new Date(lastTransaction.created_at).toLocaleDateString()
                  : "-"}
              </h2>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value as "ALL" | "IN" | "OUT")
                }
                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="ALL">All Transactions</option>
                <option value="IN">Stock In</option>
                <option value="OUT">Stock Out</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(
                    e.target.value as
                      | "ALL"
                      | "TODAY"
                      | "7_DAYS"
                      | "30_DAYS"
                      | "THIS_MONTH",
                  )
                }
                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="ALL">All Time</option>
                <option value="TODAY">Today</option>
                <option value="7_DAYS">Last 7 Days</option>
                <option value="30_DAYS">Last 30 Days</option>
                <option value="THIS_MONTH">This Month</option>
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredTransactions.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">
                {transactions.length}
              </span>{" "}
              transactions
            </p>

            {(search !== "" ||
              typeFilter !== "ALL" ||
              dateFilter !== "ALL") && (
              <button
                onClick={clearFilters}
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Inventory Table */}
          <InventoryTable
            transactions={paginatedTransactions}
            loading={loading}
          />
          {/* Pagination */}
          <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span>
                Showing{" "}
                <span className="font-semibold">
                  {filteredTransactions.length === 0 ? 0 : indexOfFirstRow + 1}
                </span>{" "}
                -
                <span className="font-semibold">
                  {Math.min(indexOfLastRow, filteredTransactions.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold">
                  {filteredTransactions.length}
                </span>
              </span>

              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>

              <span>rows/page</span>
            </div>

            {/* Right Side */}
            <div className="flex flex-wrap items-center gap-2">
              {/* First */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronsLeft size={18} />
              </button>

              {/* Previous */}
              <button
                onClick={() => setCurrentPage((page) => page - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Page Numbers */}
              {visiblePages.map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 text-slate-500"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`flex h-10 min-w-[40px] items-center justify-center rounded-xl px-3 transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-md"
                        : "border border-slate-300 bg-white hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight size={18} />
              </button>

              {/* Last */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronsRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <InventoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        products={products}
        onTransactionAdded={fetchInventoryData}
      />
    </>
  );
};

export default InventoryPage;
