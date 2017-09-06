import { Injectable } from "@angular/core";
import { Product } from "../product.model";
import {Subject} from "rxjs/Subject"
@Injectable()
export class ProductService{
private products:Product[]=[];

refreshProducts=new Subject<void>();
getProducts()
{
  return this.products.slice();
}

setProducts(data:Product[]){
  console.log(data);
  this.products=data;
  this.refreshProducts.next();
  console.log(this.products.length);
}

}
