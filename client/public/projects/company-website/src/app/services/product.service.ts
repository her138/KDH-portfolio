import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Silk Satin Pillowcase',
      price: 49.99,
      image: '/images/products/pillow-case.png',
      shortDescription: '100% pure mulberry silk for hair preservation',
      fullDescription: 'Experience the ultimate luxury with our 100% pure mulberry silk pillowcase. Designed to reduce friction, prevent hair breakage, and minimize sleep creases. The natural silk proteins help retain moisture, keeping your hair and skin hydrated throughout the night.',
      category: 'Satin Range',
      isNew: true
    },
    {
      id: 2,
      name: 'Satin Swirl Cap',
      price: 34.99,
      image: '/images/products/satin-cap.png',
      shortDescription: 'Stylish satin cap for protective styling',
      fullDescription: 'Elevate your protective style game with our elegant satin swirl cap. Perfect for deep conditioning nights, preserving hairstyles, and adding a touch of glamour to your self-care routine. The swirl design adds sophistication while the satin material protects your hair.',
      category: 'Satin Range',
      isNew: true
    },
    {
      id: 3,
      name: 'Argan Oil Hair Serum',
      price: 34.99,
      image: '/images/products/castor-oil.png',
      shortDescription: 'Nourishing treatment for damaged hair',
      fullDescription: 'Infused with pure Moroccan argan oil and vitamin E, our lightweight hair serum repairs split ends, tames frizz, and adds brilliant shine. Free from sulfates and parabens, perfect for daily use on all hair types.',
      category: 'Hair Care',
      isNew: true
    },
    {
      id: 4,
      name: 'Shampoo',
      price: 28.99,
      image: '/images/products/Shampoo-1.png',
      shortDescription: 'Gentle cleansing for all hair types',
      fullDescription: 'Our premium shampoo gently cleanses without stripping natural oils. Formulated with natural ingredients to nourish and strengthen hair from root to tip. Perfect for daily use on all hair types.',
      category: 'Hair Care',
      isNew: true
    },
    {
      id: 5,
      name: 'Shampoo & Conditioner Set',
      price: 52.99,
      image: '/images/products/Shampoo-Conditioner.png',
      shortDescription: 'Complete hair care duo',
      fullDescription: 'Experience the perfect pairing with our shampoo and conditioner set. The dynamic duo works together to cleanse, nourish, and protect your hair, leaving it soft, shiny, and manageable. Ideal for maintaining healthy, beautiful hair.',
      category: 'Hair Care',
      isNew: false
    },
    {
      id: 6,
      name: 'Satin Scrunchies Set',
      price: 19.99,
      image: '/images/products/Scrunchies.png',
      shortDescription: 'Set of 4 luxury satin hair ties',
      fullDescription: 'Gentle on hair and stylish to wear. This set includes 4 scrunchies in neutral tones, made from premium satin that prevents breakage and creasing. Perfect for creating effortless updos without damaging your hair.',
      category: 'Accessories',
      isNew: false
    },
    {
      id: 7,
      name: 'Detangle Brush',
      price: 15.99,
      image: '/images/products/brush.png',
      shortDescription: 'Gentle detangling for all hair types',
      fullDescription: 'Our specially designed detangle brush glides through hair with ease, minimizing breakage and pain. Perfect for wet or dry detangling, suitable for all hair textures including curly, coily, and fine hair.',
      category: 'Accessories',
      isNew: true
    },
    {
      id: 8,
      name: 'Keratin Repair Mask',
      price: 42.99,
      image: '/images/products/hair-mask.png',
      shortDescription: 'Intensive treatment for weakened hair',
      fullDescription: 'Restore strength and elasticity with our keratin-infused hair mask. Formulated with natural oils and proteins to repair damage from heat styling and chemical treatments. Vegan and cruelty-free formula.',
      category: 'Hair Care',
      isNew: false
    }
  ];

  private cart: Product[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  addToCart(product: Product): void {
    this.cart.push(product);
    this.cartCountSubject.next(this.cart.length);
  }

  getCartCount(): number {
    return this.cart.length;
  }

  clearCart(): void {
    this.cart = [];
    this.cartCountSubject.next(0);
  }
}