import { Component, OnInit } from '@angular/core';
import {ProductDatabaseService  } from '../product/services/product-database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  category: string;
  constructor(private productDatabaseService: ProductDatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {

  }


}
