export interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  discount?: number;
  description?: string;
  reviewCount?: number;
  badge?: "Hot" | "New" | "Sale" | "Bestseller";
  inStock?: boolean;
}

export interface Video {
  id: string;
  title: string;
  video: string;
  duration?: string;    // Optional - "02:30" format
  views?: number;       // Optional - view count
  thumbnail?: string;   // Optional - custom thumbnail
}
