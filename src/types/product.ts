export interface Product {
  id: string;
  created_at: string;

  product_name: string;
  category: string;

  selling_price: number;
  cost_price: number;

  stock: number;
  min_stock: number;

  image_url: string | null;

  status: "Active" | "Inactive";
  store_name: string;
}

export interface ProductFormData {
  product_name: string;

  category: string;

  selling_price: string;
  cost_price: string;

  stock: string;
  min_stock: string;

  image_url?: string;

  status: "Active" | "Inactive";
}

export interface ProductPayload {
  product_name: string;

  category: string;

  selling_price: number;
  cost_price: number;

  stock: number;
  min_stock: number;

  image_url?: string;

  status: "Active" | "Inactive";
  store_name: string;
}