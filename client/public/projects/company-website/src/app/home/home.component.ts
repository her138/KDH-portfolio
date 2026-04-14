import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  
 // Notification properties
  showNotification: boolean = false;
  notificationMessage: string = '';

  // Ratings data for products
  ratings: { [key: number]: number } = {
    1: 4.8,  
    2: 4.6,  
    3: 4.9,  
    4: 4.5,  
    5: 4.7,  
    6: 4.9,  
    7: 4.6,  
    8: 4.8,  
    9: 4.4   
  };
  
  ratingCounts: { [key: number]: number } = {
    1: 156,
    2: 98,
    3: 67,
    4: 234,
    5: 189,
    6: 145,
    7: 278,
    8: 112,
    9: 203
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const allProducts = this.productService.getProducts();
    this.featuredProducts = allProducts.filter(p => p.isNew === true);
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
    this.showTemporaryNotification(`${product.name} added to your cart!`);
  }

  // Method to show a temporary notification
  showTemporaryNotification(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 2000);
  }
  
  onSubscribe() {
    alert('Thank you for subscribing to SaraJane!');
  }
  
  getStars(productId: number): string[] {
    const rating = this.ratings[productId] || 4.5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    if (hasHalfStar) {
      stars.push('½');
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }
    
    return stars;
  }
  
  getRatingCount(productId: number): number {
    return this.ratingCounts[productId] || 100;
  }
}