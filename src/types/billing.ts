export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

export interface Sale {
  id: string;
  owner_id: string;
  store_name: string;
  customer_name: string | null;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  created_at: string;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  price: number;
  total: number;
}

export interface BillingPayload {
  customerName?: string;
  paymentMethod: string;

  discount: number;
  tax: number;

  items: CartItem[];
}
export interface Sale {
  id: string;
  owner_id: string;
  store_name: string;
  invoice_number: string;
  customer_name: string | null;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  payment_method: string;
  created_at: string;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  price: number;
  total: number;
}