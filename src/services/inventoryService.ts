import { supabase } from "./supabase";

import type {
  InventoryTransaction,
  InventoryTransactionPayload,
} from "../types/inventory";

import type { Product } from "../types/product";

export const getInventoryTransactions = async (): Promise<
  InventoryTransaction[]
> => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const { data, error } = await supabase
    .from("inventory_transactions")
    .select("*")
    .eq("store_name", currentUser.store_name)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const addInventoryTransaction = async (
  payload: InventoryTransactionPayload
) => {
  const { data, error } = await supabase
    .from("inventory_transactions")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getProductById = async (
  productId: string
): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateProductStock = async (
  productId: string,
  newStock: number
) => {
  const { error } = await supabase
    .from("products")
    .update({
      stock: newStock,
    })
    .eq("id", productId);

  if (error) {
    throw error;
  }
};