import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'all';
  
  // Notification properties
  showNotification: boolean = false;
  notificationMessage: string = '';
  
  // Ratings data for 8 products
  ratings: { [key: number]: number } = {
    1: 4.8,  
    2: 4.9,  
    3: 4.5,   
    4: 4.7, 
    5: 4.9,  
    6: 4.6,
    7: 4.8,  
    8: 4.4   
  };
  
  ratingCounts: { [key: number]: number } = {
    1: 156,  
    2: 67,   
    3: 234, 
    4: 189,  
    5: 145,  
    6: 278, 
    7: 112,  
    8: 203   
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    
    // Check for category query parameter
    this.route.queryParams.subscribe(params => {
      const categoryParam = params['category'];
      if (categoryParam) {
        this.filterCategory(categoryParam);
      } else {
        this.filteredProducts = this.products;
        this.selectedCategory = 'all';
      }
    });
  }

  filterCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  viewDetails(productId: number) {
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
  
  getStars(productId: number): string[] {
    const rating = this.ratings[productId] || 4.5;
    const stars = [];
    
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
    const showFullStar = decimal >= 0.75;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    if (hasHalfStar) {
      stars.push('½');
    }
    
    if (showFullStar) {
      stars.push('★');
    }
    
    const totalStars = stars.length;
    const emptyStars = 5 - totalStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }
    
    return stars;
  }
  
  getRatingCount(productId: number): number {
    return this.ratingCounts[productId] || 100;
  }
}