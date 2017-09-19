import { Injectable } from '@angular/core';
import { Product} from '../product/product.model';
import {Subject} from 'rxjs/Subject';
import { ProductDatabaseService } from '../product/services/product-database.service';
import { AuthService } from '../Auth/auth.service';
@Injectable()
export class CartService {

  private cartProduct: Product[]= [];
  onProductsChanged = new Subject<Product[]>();
 constructor(private productDatabaseService: ProductDatabaseService, private authService: AuthService) {}

  fillCart(data: Product, quantity) {
    this.cartProduct.push(data);
//     const token = localStorage.getItem("token");
// console.log(token);
    if (!this.authService.isLoggedIn()) {
      localStorage.setItem('Cart', JSON.stringify(this.cartProduct));
    }else {
      console.log('token is not null');
      this.productDatabaseService.addCartData(data._id, quantity).subscribe(
        () => {
          console.log('added to database');
        }
      )
    }

    this.onProductsChanged.next(this.cartProduct.slice());

  }


  fillCartArray(data: Product[]) {
    console.log(data);
    this.cartProduct = data;
    // localStorage.setItem('Cart', JSON.stringify(this.cartProduct));
    this.onProductsChanged.next(this.cartProduct.slice());

  }

  getCart() {
    return this.cartProduct.slice();
  }

  removeProduct(index: number) {
    const removedProduct = this.cartProduct.splice(index, 1);

    // localStorage.setItem('Cart', JSON.stringify(this.cartProduct));
    if (this.authService.isLoggedIn()) {
      console.log("lol");
      this.productDatabaseService.removeCartData(removedProduct[0]._id).subscribe(
        (data) => {
          console.log(data);
        }
      );
    } else {
      localStorage.setItem('Cart', JSON.stringify(this.cartProduct));
    }

    this.onProductsChanged.next(this.cartProduct.slice());
  }

  emptyCart() {
    this.cartProduct = [];
    this.onProductsChanged.next(this.cartProduct.slice());
  }

}
