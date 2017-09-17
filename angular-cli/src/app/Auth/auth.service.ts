import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/Rx'
@Injectable()
export class AuthService {

  constructor(private http: Http) {}

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

}

