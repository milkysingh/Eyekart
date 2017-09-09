import { Injectable } from '@angular/core';
import { Product} from "../product/product.model";
import {Subject} from "rxjs/Subject";
@Injectable()
export class CartService {

 private cartProduct:Product[]=[];
 onProductsChanged = new Subject<Product[]>();

  fillCart(data:Product){
    this.cartProduct.push(data);
    this.onProductsChanged.next(this.cartProduct.slice());
    console.log(this.cartProduct);
  }

  getCart(){
    return this.cartProduct.slice();
  }

  removeProduct(index:number)
  {
    this.cartProduct.splice(index,1);
    this.onProductsChanged.next(this.cartProduct.slice());
  }

}
