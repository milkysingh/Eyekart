import { Injectable } from '@angular/core';
import { Product } from '../product.model';
import {Subject} from 'rxjs/Subject'
@Injectable()
export class ProductService {
  private products: Product[] = [];

  refreshProducts = new Subject < void > ();
  selectedProduct: Product;
  getProducts() {
    return this.products.slice();
  }

  setProducts(data: Product[]) {
    this.products = data;
    this.refreshProducts.next();
  }

  getProductByPosition(pos: number) {
    this.selectedProduct = this.products[pos];


    return this.selectedProduct._id;
  }

  findById(id) { // Improve it
    return this.products.find(data => {
      return data._id === id
    });
  }

  appendProducts(data: Product[]) {
    this.products.push(...data);
    this.refreshProducts.next();
  }


}

