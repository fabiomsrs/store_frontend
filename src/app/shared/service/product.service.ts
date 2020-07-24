import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductPageResponse } from '../model/productPageResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    apiUrl = 'http://localhost:3000/products';
    headers : HttpHeaders
    httpOptions: any

    constructor(
      private httpClient: HttpClient
      ) {
        if(window.localStorage.getItem('token')){
          this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('token')).accessToken
          })
        }
        else{
          this.headers = new HttpHeaders({
            'Content-Type': 'application/json',            
          })
        }
        this.httpOptions = {
            headers: this.headers
          };
      }

    public getProducts(): Observable<ProductPageResponse>{
      return this.httpClient.get<ProductPageResponse>(this.apiUrl+"?page=1&take=20")
    }

    public createProducts(product: any): Observable<any>{      
      return this.httpClient.post<any>(this.apiUrl, product, this.httpOptions)
    }
}
