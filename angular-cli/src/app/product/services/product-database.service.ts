import { Injectable } from '@angular/core';
import { Http,Response,Headers } from "@angular/http";
import "rxjs/Rx"


@Injectable()
export class ProductDatabaseService {

  constructor(private http:Http) { }
token;
  fetchData(category: string) {
    return this.http.get(`http://localhost:3000/${category}`).map(
      (response: Response) => {

        return response.json();
      }
    );
  }


  addCartData(cartProduct) {
     this.token=localStorage.getItem('token');
    const headers=new Headers();
    headers.append("x-auth",this.token);
    return this.http.post("http://localhost:3000/user/addToCart", {cartProduct},{headers})
      .map(
        (response: Response) => {
          return response.json()
        }
      );
  }

  removeCartData(id){
  this.token=localStorage.getItem('token');
    const headers=new Headers();
    headers.append("x-auth",this.token);
    return this.http.patch("http://localhost:3000/user/removeFromCart", {id},{headers})
      .map(
        (response: Response) => {
          return response.json()
        }
      );
  }
}
