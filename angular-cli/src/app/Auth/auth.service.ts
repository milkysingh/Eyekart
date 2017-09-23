import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { ProductDatabaseService } from '../product/services/product-database.service';
import 'rxjs/Rx'
@Injectable()
export class AuthService {

  constructor(private http: Http, private productDatabaseService: ProductDatabaseService) {}

  signUp(credentials) {

    return this.http.post('http://localhost:3000/user/signup', credentials).map(
      (response: Response) => {
        localStorage.setItem('token', response.headers.get('x-auth'));
        return response.json();
      }
    );
  }

  signIn(credentials) {
    return this.http.post('http://localhost:3000/user/signin', credentials).map(
      (response: Response) => {

        localStorage.setItem('token', response.headers.get('x-auth'));
        return response.json();
      }
    );
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  removeToken() {
const token = localStorage.getItem('token');
const headers = new Headers();
headers.append('x-auth', token);
this.http.delete(`http://localhost:3000/user/removeToken?token=${token}`, {headers}).subscribe(
  () => {
    console.log('Token removed');
  },
  err => {
console.log(err);
  }
);
  }

loadDataFromLocalStorage() {
  if (localStorage.getItem('Cart') !== null) {
    const localData = [];
    JSON.parse(localStorage.getItem('Cart')).forEach(element => {
      const pid = element._id;
      const quantity = element.quantity;
      localData.push({
        pid,
        quantity
      });
    });
    this.productDatabaseService.sendLocalCart(localData)
      .subscribe(
        () => {
          console.log('local storage products are added successfully to database');
        }
      );
  }
}


}

