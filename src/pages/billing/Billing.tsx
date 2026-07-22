import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import ProductSearch from "../../components/billing/ProductSearch";
import ProductGrid from "../../components/billing/ProductGrid";
import Cart from "../../components/billing/Cart";
import BillSummary from "../../components/billing/BillSummary";

import type { Product } from "../../types/product";
import type { CartItem } from "../../types/billing";

import { getAvailableProducts } from "../../services/productService";
import {
  createSale,
  createSaleItems,
  updateProductStock,
  validateCart,
} from "../../services/billingService";

const Billing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [customerName, setCustomerName] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const ITEMS_PER_PAGE = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
    loadProducts();
  }, [search]);

  const loadProducts = async () => {
    try {
      const data = await getAvailableProducts(search);
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products.");
    }
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === product.id,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          productId: product.id,
          name: product.product_name,
          price: product.selling_price,
          quantity: 1,
          stock: product.stock,
        },
      ];
    });
  };

  const increaseQuantity = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.productId !== productId) {
          return item;
        }

        if (item.quantity >= item.stock) {
          toast.error("Not enough stock.");
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCart((prevCart) =>
      prevCart.flatMap((item) => {
        if (item.productId !== productId) {
          return item;
        }

        if (item.quantity === 1) {
          return [];
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId),
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discount = 0;
  const tax = 0;

  const total = subtotal - discount + tax;
  const handleGenerateBill = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty.");
      return;
    }

    try {
      // 1. Validate Cart
      await validateCart(cart);

      // 2. Create Sale
      const sale = await createSale({
        customerName,
        paymentMethod,
        discount,
        tax,
        items: cart,
      });

      // 3. Save Sale Items
      await createSaleItems(sale.id, cart);

      // 4. Update Product Stock
      await updateProductStock(cart);

      // 5. Reload Products
      await loadProducts();

      // 6. Clear Cart
      setCart([]);

      // 7. Success
      toast.success("Bill generated successfully.");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to generate bill.");
      }
    }
  };

  return (
    <div className="w-full space-y-6 px-4 sm:px-6 lg:px-0 xl:col-span-2">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Billing Terminal
          </span>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            Create New Invoice 🧾
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Search products, manage your shopping cart and generate customer
            invoices quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border bg-slate-50 px-4 py-4 text-center sm:px-5 sm:py-4">
            <div className="flex flex-col items-center gap-1 sm:block">
              <p className="text-[10px] uppercase tracking-wide text-slate-500 sm:text-xs">
                Products
              </p>

              <h2 className="text-lg font-bold text-slate-800 sm:mt-1 sm:text-2xl">
                {products.length}
              </h2>
            </div>
          </div>

          <div className="rounded-xl border bg-slate-50 px-2 py-3 text-center sm:rounded-2xl sm:px-5 sm:py-4">
            <div className="flex flex-col items-center gap-1 sm:block">
              <p className="text-[10px] uppercase tracking-wide text-slate-500 sm:text-xs">
                Cart
              </p>

              <h2 className="text-lg font-bold text-blue-600 sm:mt-1 sm:text-2xl">
                {cart.length}
              </h2>
            </div>
          </div>

          <div className="rounded-xl border bg-slate-50 px-2 py-3 text-center sm:rounded-2xl sm:px-5 sm:py-4">
            <div className="flex flex-col items-center gap-1 sm:block">
              <p className="text-[10px] uppercase tracking-wide text-slate-500 sm:text-xs">
                Total
              </p>

              <h2 className="text-lg font-bold text-green-600 sm:mt-1 sm:text-2xl break-all">
                ₹{total.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-3">
          <ProductSearch search={search} onSearchChange={setSearch} />

          <ProductGrid
            products={paginatedProducts}
            onAddToCart={handleAddToCart}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={products.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>

        <div className="w-full space-y-6 sm:px-6 lg:px-0 xl:col-span-2">
          <Cart
            cart={cart}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
          />

          <BillSummary
            subtotal={subtotal}
            discount={discount}
            tax={tax}
            total={total}
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onGenerateBill={handleGenerateBill}
          />
        </div>
      </div>
    </div>
  );
};

export default Billing;
