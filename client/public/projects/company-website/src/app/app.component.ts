import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'company-website';
  cartCount = 0;
  isMenuOpen = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  onSubscribe() {
    alert('Thank you for joining the SJ Gals Circle! You\'ll receive exclusive offers and updates.');
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { category: category } });
    this.closeMenu();
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: any) {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }
}