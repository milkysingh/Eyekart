import { Component, OnInit,Input } from '@angular/core';
import {Product} from '../product.model'
import { ProductService } from "../services/product.service";
import { ProductDatabaseService } from "../services/product-database.service";
import {Router,Params,ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  error;
  products: Product[];
  @Input()flag:boolean=true;
  constructor(
    private productService: ProductService,
    private productDatabase: ProductDatabaseService,
    private route: ActivatedRoute
  ) {}

ngOnInit() {
  this.route.params.subscribe(
    (params) => {
      this.productDatabase.fetchData(params.category).subscribe(
        (data) => {
          this.productService.setProducts(data);
        },
        err => {
          this.error = err;
        }
      );
    }
  );
  this.productService.refreshProducts.subscribe(
    () => {
      this.products = this.productService.getProducts();
    }
  );

}


}

