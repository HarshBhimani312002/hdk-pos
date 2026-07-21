export interface InventoryTransaction {
  id: string;
  created_at: string;

  product_id: string;
  product_name: string;

  transaction_type: "IN" | "OUT";

  quantity: number;

  previous_stock: number;
  new_stock: number;

  remarks: string | null;

  performed_by: string;

  store_name: string;
}

export interface InventoryTransactionFormData {
  product_id: string;

  transaction_type: "IN" | "OUT";

  quantity: string;

  remarks: string;
}

export interface InventoryTransactionPayload {
  product_id: string;

  transaction_type: "IN" | "OUT";

  quantity: number;

  remarks: string;

  product_name: string;

  previous_stock: number;

  new_stock: number;

  performed_by: string;

  store_name: string;
}