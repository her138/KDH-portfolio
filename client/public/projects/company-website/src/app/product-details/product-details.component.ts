import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  featuresOpen: boolean = false;

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
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  addToCart() {
    if (this.product) {
      this.productService.addToCart(this.product);
      this.showTemporaryNotification(`${this.product.name} added to your cart!`);
    }
  }

  toggleFeatures() {
    this.featuresOpen = !this.featuresOpen;
  }

  // Method to show temporary notification
  showTemporaryNotification(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 2000);
  }

  getStars(): string[] {
    if (!this.product) return ['☆', '☆', '☆', '☆', '☆'];
    
    const rating = this.ratings[this.product.id] || 4.5;
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
  
  getRatingCount(): number {
    if (!this.product) return 0;
    return this.ratingCounts[this.product.id] || 100;
  }
}