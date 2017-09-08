import { Component, OnInit,Input } from '@angular/core';
import { Product } from "../../product.model";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute,Router } from "@angular/router";
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

 @Input() productItem:Product;
 @Input()position:number;
id;
@Input()changeView:boolean;

  constructor(
    private productService:ProductService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {

  }
  onProductSelected()
  {

 this.id=this.productService.getProductByPosition(this.position);
this.router.navigate([`${this.id}`],{relativeTo:this.route});
this.changeView=false;
  }

}
