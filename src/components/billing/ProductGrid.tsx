import type { Product } from "../../types/product";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;

  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;

  onPageChange: (page: number) => void;
}

const ProductGrid = ({
  products,
  onAddToCart,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: ProductGridProps) => {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Products</h2>

          <p className="mt-1 text-sm text-slate-500">
            Click any product to add it to the shopping cart.
          </p>
        </div>

        <div className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
          {products.length} Items
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
          <p className="text-slate-500">No products found.</p>
        </div>
      ) : (
        <div
          className="
    flex-1
    overflow-y-auto
    pr-2

      grid
  grid-cols-1
  gap-6
  sm:grid-cols-2
  lg:grid-cols-3


    content-start
    auto-rows-max
  "
        >
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => onAddToCart(product)}
              className="
                group
                flex
                min-h-[220px] w-full
                flex-col
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                text-left
                shadow-sm
                transition-all
                duration-200
                hover:border-blue-500
                hover:shadow-lg
              "
            >
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                📦
              </div>

              {/* Product Name */}
              <h3 className="mt-5 min-h-[48px] text-base font-bold leading-6 text-slate-800">
                {product.product_name}
              </h3>

              {/* Price */}
              <p className="mt-4 text-3xl font-bold text-blue-600">
                ₹{product.selling_price}
              </p>

              {/* Stock */}
              <div className="mt-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  Stock: {product.stock}
                </span>
              </div>
              {/* Add to Cart */}
              <div className="mt-auto pt-6">
                <div className="w-full rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white transition duration-200 group-hover:bg-blue-700">
                  + Add to Cart
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <>
          {/* Desktop / Tablet */}
          <div className="mt-6 hidden border-t border-slate-200 pt-6 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span>
                Showing{" "}
                <span className="font-semibold">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                -
                <span className="font-semibold">
                  {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>
              </span>

              <span>{itemsPerPage} rows/page</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronsLeft size={18} />
              </button>

              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight size={18} />
              </button>

              <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronsRight size={18} />
              </button>
            </div>
          </div>
          {/* Mobile Only */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-6 sm:hidden">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="text-center text-xs text-slate-600">
              <div>
                Showing{" "}
                <span className="font-semibold">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>
                {" - "}
                <span className="font-semibold">
                  {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>
              </div>

              <div>{itemsPerPage} rows/page</div>
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
