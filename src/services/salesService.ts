import { supabase } from "./supabase";
import type { Sale } from "../types/sale";

export const getSales = async (): Promise<Sale[]> => {
  const { data, error } = await supabase
    .from("sales")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
};