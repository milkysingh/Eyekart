import { Component, OnInit,Input } from '@angular/core';
import { Product } from "../product.model";
import { ProductService } from "../services/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  selectedProduct:Product;

  constructor(private prodctService:ProductService) { }

  ngOnInit() {
    this.prodctService.selectedProduct.subscribe(
      (data) =>{
         this.selectedProduct=data;
         console.log(this.selectedProduct);
      }
    );
console.log("hello");
  }

}
