import { supabase } from "./supabase";
import type {
  BillingPayload,
  CartItem,
} from "../types/billing";

export const createSale = async (
  payload: BillingPayload
) => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")!
  );

  const invoiceNumber = "INV-" + Date.now();

  const subtotal = payload.items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const total =
    subtotal -
    payload.discount +
    payload.tax;

  const { data, error } = await supabase
    .from("sales")
    .insert({
      owner_id: currentUser.id,
      store_name: currentUser.store_name,

      invoice_number: invoiceNumber,

      customer_name:
        payload.customerName || null,

      subtotal,
      discount: payload.discount,
      tax: payload.tax,
      total,

      payment_method: payload.paymentMethod,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const createSaleItems = async (
  saleId: string,
  items: CartItem[]
) => {
  const saleItems = items.map((item) => ({
    sale_id: saleId,
    product_id: item.productId,
    quantity: item.quantity,
    price: item.price,
    total: item.price * item.quantity,
  }));

  const { error } = await supabase
    .from("sale_items")
    .insert(saleItems);

  if (error) {
    throw error;
  }
};
export const updateProductStock = async (
  items: CartItem[]
) => {
  for (const item of items) {
    const { data: product, error: fetchError } =
      await supabase
        .from("products")
        .select("stock")
        .eq("id", item.productId)
        .single();

    if (fetchError) {
      throw fetchError;
    }

    const newStock = product.stock - item.quantity;

    const { error: updateError } = await supabase
      .from("products")
      .update({
        stock: newStock,
      })
      .eq("id", item.productId);

    if (updateError) {
      throw updateError;
    }
  }
};
export const validateCart = async (
  items: CartItem[]
) => {
  for (const item of items) {
    const { data, error } = await supabase
      .from("products")
      .select("product_name, stock, status")
      .eq("id", item.productId)
      .single();

    if (error) {
      throw error;
    }

    if (data.status !== "Active") {
      throw new Error(
        `${data.product_name} is inactive.`
      );
    }

    if (data.stock < item.quantity) {
      throw new Error(
        `${data.product_name} has only ${data.stock} items left.`
      );
    }
  }
};