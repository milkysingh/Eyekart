import { Injectable } from '@angular/core';
import { Product} from "../product/product.model";
import {Subject} from "rxjs/Subject";
import { ProductDatabaseService } from "../product/services/product-database.service";
@Injectable()
export class CartService {

 constructor(private productDatabaseService:ProductDatabaseService){}
 private cartProduct:Product[]=[];
 onProductsChanged = new Subject<Product[]>();

  fillCart(data: Product) {
    this.cartProduct.push(data);
    const token = localStorage.getItem("token");
console.log(token);
    if (token === null) {
      localStorage.setItem('Cart', JSON.stringify(this.cartProduct));
    }
    else {
      console.log("token is not null");
      this.productDatabaseService.addCartData(token, data._id).subscribe(
        () =>{
          console.log("added to database");
        }
      )
    }

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
