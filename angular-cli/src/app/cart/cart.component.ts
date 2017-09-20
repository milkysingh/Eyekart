import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart-service.service';
import { Product } from '../product/product.model';
import { ProductDatabaseService } from '../product/services/product-database.service';
import { AuthService } from '../Auth/auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  addedProducts: Product[] = [];
  isEmpty: boolean = true;
  constructor(
    private cartService: CartService,
    private productDatabaseService: ProductDatabaseService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.addedProducts = this.cartService.getCart();
    this.cartService.onProductsChanged.subscribe(
      (data) => {
        this.addedProducts = data;

      }
    );

    if (this.authService.isLoggedIn()) {
      console.log('null is present');
      this.productDatabaseService.fetchCartData()
        .subscribe(
          (items) => {
            this.addedProducts = items;

            if (this.addedProducts.length !== 0) {
              this.cartService.fillCartArray(this.addedProducts);
              this.isEmpty = false;
            }
          }
        );
      return;
    }
    if (JSON.parse(localStorage.getItem('Cart')) === null) {
      return;
    }
    if (JSON.parse(localStorage.getItem('Cart')).length !== 0) {

      this.isEmpty = false;
      this.addedProducts = JSON.parse(localStorage.getItem('Cart'));
      this.cartService.fillCartArray(this.addedProducts);
    }

  }

  onRemoveClicked(index: number) {
    this.cartService.removeProduct(index);
    if (this.addedProducts.length === 0) {
      this.isEmpty = true;
    }

  }
  }


