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
category = '';
noOfProductsInCart: number;

  constructor(
    private productDatabaseService: ProductDatabaseService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit() {

    this.cartService.onCartItemChange.subscribe(
 (data) => {
   this.noOfProductsInCart = data;
 }
    )
    if (this.authService.isLoggedIn()) {
      this.productDatabaseService.fetchCartData().subscribe
      (
        (data) => {
         this.cartService.fillCartArray(data);
        },
        (err) => {
          console.log(err);
        }
      )
    }else {
      if (JSON.parse(localStorage.getItem('Cart')) === null) {
        return;
      }
      this.cartService.fillCartArray(JSON.parse(localStorage.getItem('Cart')));
    }
  }

  setCategory(category) {
    console.log(category);
    this.router.navigate([`/products/${category}`]);
  }

  onLogout() {
    this.cartService.emptyCart();
    this.noOfProductsInCart = 0;
    this.authService.removeToken();
    localStorage.clear();
  }
}
