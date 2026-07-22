export interface Sale {
  id: string;
  invoice_number: string;
  customer_name: string | null;
  payment_method: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  created_at: string;
}