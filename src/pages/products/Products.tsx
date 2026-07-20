import { useEffect, useState } from "react";
import { Package, Plus, Search } from "lucide-react";

import MainLayout from "../../layouts/MainLayout";
import { useUser } from "../../context/UserContext";

import ProductTable from "../../components/products/ProductTable";
import ProductModal from "../../components/products/ProductModal";
import DeleteProductModal from "../../components/products/DeleteProductModal";

import type { Product } from "../../types/product";
import { getProducts, deleteProduct } from "../../services/productService";

const Products = () => {
  const { user } = useUser();

  const isOwner = user?.role === "owner";

  const [modalOpen, setModalOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Edit states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Delete states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id);

      await fetchProducts();

      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // Lock background scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

 const filteredProducts = products.filter((product) =>
  product.product_name
    .toLowerCase()
    .includes(searchTerm.trim().toLowerCase())
);
  console.log("Search:", searchTerm);
  console.log("Products:", products);
  console.log("Filtered Products:", filteredProducts);

  return (
    <MainLayout>
      <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Package size={14} />
                Product Management
              </div>

              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                Products
              </h1>

              <p className="mt-2 text-slate-500">
                Manage your store products from one place.
              </p>
            </div>

            {isOwner && (
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setIsEditing(false);
                  setModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                <Plus size={18} />
                Add Product
              </button>
            )}
          </div>

          {/* Search & Stats */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
              <Package size={18} />
              Total Products: {products.length}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <ProductTable
          products={filteredProducts}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {/* Product Modal */}
        <ProductModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedProduct(null);
            setIsEditing(false);
          }}
          onProductAdded={fetchProducts}
          product={selectedProduct}
          isEditing={isEditing}
        />

        {/* Delete Product Modal */}
        <DeleteProductModal
          open={deleteModalOpen}
          product={productToDelete}
          onClose={() => {
            setDeleteModalOpen(false);
            setProductToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </MainLayout>
  );
};

export default Products;
