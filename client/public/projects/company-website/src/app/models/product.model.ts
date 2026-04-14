export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  isNew?: boolean;
  rating?: number;  
  ratingCount?: number; 
}