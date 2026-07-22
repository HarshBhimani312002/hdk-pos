import type { Product } from "../../types/product";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 text-lg font-semibold">Products</h2>

      {products.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <button
              onClick={() => onAddToCart(product)}
              key={product.id}
              className="rounded-lg border p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
            >
              <p className="font-semibold">{product.product_name}</p>

              <p className="text-sm text-gray-500">₹{product.selling_price}</p>

              <p className="mt-2 text-xs text-green-600">
                Stock: {product.stock}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
