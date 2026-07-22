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
export const deleteMonthlySales = async (
  month: number,
  year: number,
) => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}",
  );

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 1);

  const { error } = await supabase
    .from("sales")
    .delete()
    .eq("store_name", currentUser.store_name)
    .gte("created_at", startDate.toISOString())
    .lt("created_at", endDate.toISOString());

  if (error) {
    throw error;
  }
};