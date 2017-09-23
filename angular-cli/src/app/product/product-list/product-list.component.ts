import { Component, OnInit } from '@angular/core';
import {Product} from '../product.model'
import { ProductService } from '../services/product.service';
import { ProductDatabaseService } from '../services/product-database.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  error;
  products: Product[];
  category: string;
  counter = 4;
  noMore = false;
  constructor(
    private productService: ProductService,
    private productDatabase: ProductDatabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.counter = 4;
        this.noMore = false;
        this.productDatabase.fetchData(params.category).subscribe(
          (data) => {
            console.log(data);
            this.productService.setProducts(data);
          },

        );
      }
    );
    this.productService.refreshProducts.subscribe(
      () => {
        this.products = this.productService.getProducts();
      }
    );

  }

  loadMoreProduct() {
    this.productDatabase.loadProducts(this.counter).subscribe(
      (data) => {
        if (data.length === 0) {
          this.noMore = true;
        }
        this.productService.appendProducts(data);

      },
      err => {
        this.error = err;
      }
    );
    this.productService.refreshProducts.subscribe(
      () => {
        this.products = this.productService.getProducts();
      }
    );
    this.counter += 4;
  }
  }


