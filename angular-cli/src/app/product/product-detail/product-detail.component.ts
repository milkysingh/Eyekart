import { Component, OnInit,Input,OnDestroy,ViewChild } from '@angular/core';
import { Product } from "../product.model";
import { ProductService } from "../services/product.service";
import { ProductDatabaseService } from "../services/product-database.service";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "../../cart/cart-service.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  selectedProduct: Product;
  dataAvailable: boolean = false;
  subscribe: Subscription
  @ViewChild('quant') quantity;

  constructor(
      private productService: ProductService,
      private route: ActivatedRoute,
      private productDatabase: ProductDatabaseService,
      private cartService : CartService
    ) {}

  ngOnInit() {
    this.route.params.subscribe(

      (data) => {
        if (this.productService.getProducts().length === 0) {
          this.productDatabase.fetchData(data.category).subscribe(
            (products) => {
              this.productService.setProducts(products);
              console.log("I ran!.");
              this.selectedProduct = this.productService.findById(data.id);
            }
          );
        } else {
          this.selectedProduct = this.productService.findById(data.id);
        }
      }
    );
  }
  addToCart(){
    console.log(this.selectedProduct);
    this.selectedProduct.quantity = this.quantity.nativeElement.value;
  this.cartService.fillCart(this.selectedProduct);
  alert("Added to cart successfully");
}


}

