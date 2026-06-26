export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
  badge?: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CodeSnippet {
  title: string;
  description: string;
  code: string;
  language: 'javascript' | 'html';
}
