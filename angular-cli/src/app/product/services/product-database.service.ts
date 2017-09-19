import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx'
import { Product } from '../product.model';


@Injectable()
export class ProductDatabaseService {
  token;
  constructor(private http: Http) {}

  fetchData(category: string) {
    return this.http.get(`http://localhost:3000/${category}`).map(
      (response: Response) => {

        return response.json();
      }
    );
  }


  addCartData(cartProduct, quantity) {
    this.token = this.getToken();
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.post('http://localhost:3000/user/addToCart', {
        cartProduct,
        quantity
      }, {
        headers
      })
      .map(
        (response: Response) => {
          return response.json()
        }
      );
  }

  removeCartData(id) {
    this.token = this.getToken();
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.patch('http://localhost:3000/user/removeFromCart', {
        id
      }, {
        headers
      })
      .map(
        (response: Response) => {
          return response.json()
        }
      );
  }
  fetchCartData() {
    this.token = this.getToken();
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.get('http://localhost:3000/user/getFromCart', {
        headers
      })
      .map(
        (response: Response) => {
          console.log(response);
          return response.json();
        }
      );
  }
  sendLocalCart(localProducts) {
    console.log(localProducts);
    this.token = this.getToken();
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.post('http://localhost:3000/user/addLocalProducts', {localProducts}, {headers});

  }

  getToken() {
    return localStorage.getItem('token');
  }
}

