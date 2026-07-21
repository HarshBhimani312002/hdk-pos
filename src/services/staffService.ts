import { supabase } from "./supabase";
import type {
  Staff,
  StaffPayload,
  UpdateStaffPayload,
} from "../types/staff";

// Get all staff
export const getStaff = async (
  ownerId: string
): Promise<Staff[]> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "staff")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as Staff[];
};

// Add staff
export const addStaff = async (
  ownerId: string,
  storeName: string,
  staff: StaffPayload
): Promise<Staff> => {
  const { data, error } = await supabase
    .from("users")
    .insert({
      username: staff.username,
      password: staff.password,
      status: staff.status,
      role: "staff",
      owner_id: ownerId,
      store_name: storeName,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Staff;
};

// Update staff
export const updateStaff = async (
  id: string,
  staff: UpdateStaffPayload
): Promise<Staff> => {
  const { data, error } = await supabase
    .from("users")
    .update(staff)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Staff;
};

// Delete staff
export const deleteStaff = async (
  id: string
): Promise<void> => {
  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
};

// Check username already exists
export const checkUsernameExists = async (
  username: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return !!data;
};

// Check username exists excluding current staff
export const checkUsernameExistsExceptCurrent = async (
  username: string,
  currentStaffId: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .neq("id", currentStaffId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return !!data;
};