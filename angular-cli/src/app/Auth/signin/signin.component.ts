import { Component, OnInit } from '@angular/core';
import {AuthService  } from '../auth.service';
import { Router } from '@angular/router';
import {CartService  } from '../../cart/cart-service.service';
import { ProductDatabaseService } from '../../product/services/product-database.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
     private router: Router,
      private productDatabaseService: ProductDatabaseService,
      private cartService: CartService

    ) {}
ngOnInit() {}

onSubmit(form) {
  const sendData = {
    email: form.value.email,
    password: form.value.password
  }
  this.authService.signIn(sendData).subscribe(
    (response) => {
      this.authService.loadDataFromLocalStorage();
      this.productDatabaseService.fetchCartData().subscribe
      (
        (data) => {
         this.cartService.fillCartArray(data);
        },
        (err) => {
          console.log(err);
        }
      )
      this.router.navigate(['/']);
    },
    (err) => {
      console.log('there is an error');
    }
  );
}
}



