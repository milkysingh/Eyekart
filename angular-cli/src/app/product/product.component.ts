import { Component, OnInit } from '@angular/core';
import {ProductDatabaseService  } from '../product/services/product-database.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { CartService } from '../cart/cart-service.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  category: string;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
     private productDatabaseService: ProductDatabaseService,
      private cartService: CartService) { }

  ngOnInit() {}


}
