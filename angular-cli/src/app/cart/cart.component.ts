import { Component, OnInit } from '@angular/core';
import { CartService } from "../cart/cart-service.service";
import { Product } from "../product/product.model";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   addedProducts:Product[]=[];
   isEmpty:boolean = true;
  constructor(private cartService:CartService) { }

  ngOnInit() {

    this.addedProducts = this.cartService.getCart();
    this.cartService.onProductsChanged.subscribe(
      (data) => {
        this.addedProducts = data;

      }
    );

    if (JSON.parse(localStorage.getItem("Cart")) === null) {
      console.log("null is present");
      return;
    }

    if (JSON.parse(localStorage.getItem("Cart")).length !== 0) {

      this.isEmpty = false;
      this.addedProducts = JSON.parse(localStorage.getItem("Cart"));
      console.log(JSON.parse(localStorage.getItem("Cart")));
      this.cartService.fillCartArray(this.addedProducts);
    }

    }

    onRemoveClicked(index: number) {
      this.cartService.removeProduct(index);
      if (this.addedProducts.length === 0) {
        this.isEmpty = true;

      }

    }
    }

