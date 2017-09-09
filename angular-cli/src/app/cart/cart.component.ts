import { Component, OnInit } from '@angular/core';
import { CartService } from "../cart/cart-service.service";
import { Product } from "../product/product.model";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   addedProducts:Product[];
   isEmpty:boolean = false;
  constructor(private cartService:CartService) { }

  ngOnInit() {

    this.addedProducts=this.cartService.getCart();
    this.cartService.onProductsChanged.subscribe(
      (data) => {
          this.addedProducts = data;

          localStorage.setItem('Cart',JSON.stringify(this.addedProducts));
      }
    );
    if(this.addedProducts.length === 0)
      {

        this.isEmpty = true;
      }


  }

  onRemoveClicked(index:number)
  {
    this.cartService.removeProduct(index);
    if(this.addedProducts.length === 0)
      {
        this.isEmpty = true;

      }

  }
}
