import { Injectable } from '@angular/core';
import { Http,Response,Headers } from "@angular/http";
import "rxjs/Rx"


@Injectable()
export class ProductDatabaseService {

  constructor(private http:Http) { }

  fetchData(category: string) {
    return this.http.get(`http://localhost:3000/${category}`).map(
      (response: Response) => {

        return response.json();
      }
    );
  }


  addCartData(token, cartProduct) {
    const headers=new Headers();
    headers.append("x-auth",token);
    return this.http.post("http://localhost:3000/user/addToCart", {cartProduct},{headers})
      .map(
        (response: Response) => {
          return response.json()
        }
      );
  }

  }

