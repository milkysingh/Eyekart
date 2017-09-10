import { Injectable } from '@angular/core';
import { Http,Response } from "@angular/http";
import "rxjs/Rx"


@Injectable()
export class ProductDatabaseService {

  constructor(private http:Http) { }

  fetchData(category:string){
     return this.http.get(`http://localhost:3000/${category}`).map(
      (response:Response) => {
          console.log(response.headers.get('test'));
           return response.json();
     }
    );
  }

}
