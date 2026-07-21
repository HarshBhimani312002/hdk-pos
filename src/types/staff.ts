export interface Staff {
  id: string;
  username: string;
  password: string;
  role: "staff";
  status: "Active" | "Inactive";
  owner_id: string;
  store_name: string;
  created_at: string;
}

export interface StaffPayload {
  username: string;
  password: string;
  status: "Active" | "Inactive";
}

export interface UpdateStaffPayload {
  username?: string;
  password?: string;
  status?: "Active" | "Inactive";
}