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
  // isEmpty = true;
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

  }


  onRemoveClicked(index: number) {
    this.cartService.removeProduct(index);
    if (this.addedProducts.length === 0) {
    }

  }
  }

