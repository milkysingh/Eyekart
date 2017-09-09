import { Injectable } from '@angular/core';
import { Product} from "../product/product.model";
import {Subject} from "rxjs/Subject";
@Injectable()
export class CartService {

 private cartProduct:Product[]=[];
 onProductsChanged = new Subject<Product[]>();

  fillCart(data:Product){
    this.cartProduct.push(data);
    localStorage.setItem('Cart', JSON.stringify(this.cartProduct));
    this.onProductsChanged.next(this.cartProduct.slice());

  }

  fillCartArray(data:Product[]){
    this.cartProduct = data;
    localStorage.setItem('Cart', JSON.stringify(this.cartProduct));
    this.onProductsChanged.next(this.cartProduct.slice());

  }

  getCart(){
    return this.cartProduct.slice();
  }

  removeProduct(index:number)
  {
    this.cartProduct.splice(index,1);
    localStorage.setItem('Cart', JSON.stringify(this.cartProduct));
    this.onProductsChanged.next(this.cartProduct.slice());
  }

}
