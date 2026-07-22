export interface InvoiceItem {
  id: string;
  sale_id: string;
  product_id: string;

  quantity: number;
  price: number;
  total: number;

  products: {
    product_name: string;
  };
}

export interface Invoice {
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