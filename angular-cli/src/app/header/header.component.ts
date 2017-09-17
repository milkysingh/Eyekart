import { Component, OnInit } from '@angular/core';
import { ProductDatabaseService } from '../product/services/product-database.service';
import {ProductService  } from '../product/services/product.service';
import {Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/Auth/auth.service';
import { CartService } from '../cart/cart-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
category: string = '';

  constructor(
    private productDatabaseService: ProductDatabaseService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  setCategory(category) {
    console.log(category);
    this.router.navigate([`/products/${category}`]);
  }

  onLogout() {
    localStorage.clear();
    this.cartService.emptyCart();
  }
}
