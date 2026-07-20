import { supabase } from "./supabase";
import type {
  Product,
  ProductPayload,
} from "../types/product";

// Get all products
// Get all products
export const getProducts = async (): Promise<Product[]> => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")!
  );

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("store_name", currentUser.store_name)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as Product[];
};

// Add product
export const addProduct = async (
  product: ProductPayload
): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Product;
};

// Update product
export const updateProduct = async (
  id: string,
  product: ProductPayload
): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Product;
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
};