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

  useEffect(() => {
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Billing</h1>

        <p className="text-gray-500">Create and manage customer bills.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <ProductSearch search={search} onSearchChange={setSearch} />

          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        </div>

        <div className="space-y-6">
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
