import { supabase } from "./supabase";
import type {
  Invoice,
  InvoiceItem,
} from "../types/invoice";

export const getInvoice = async (
  id: string,
): Promise<Invoice> => {
  const { data, error } = await supabase
    .from("sales")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getInvoiceItems = async (
  saleId: string,
): Promise<InvoiceItem[]> => {
  const { data, error } = await supabase
    .from("sale_items")
    .select(`
      id,
      sale_id,
      product_id,
      quantity,
      price,
      total,
      products (
        product_name
      )
    `)
    .eq("sale_id", saleId);

  if (error) {
    throw error;
  }

  return data as unknown as InvoiceItem[];
};