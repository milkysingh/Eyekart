import { Component, OnInit,Input,OnDestroy } from '@angular/core';
import { Product } from "../product.model";
import { ProductService } from "../services/product.service";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  selectedProduct:Product;
dataAvailable:boolean=false;
subscribe:Subscription
  constructor(private productService:ProductService,private route:ActivatedRoute ) {  }

  ngOnInit() {
this.route.params.subscribe(
  (data) => {
console.log(data.id);
this.selectedProduct= this.productService.findById(data.id);
 }
);
  }


  }

