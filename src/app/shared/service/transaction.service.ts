import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductPageResponse } from '../model/productPageResponse';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiUrl = 'http://localhost:3000/cielo';
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

  public createTransaction(transaction: any): Observable<any>{
    return this.httpClient.post<ProductPageResponse>(this.apiUrl + "/transaction", transaction, this.httpOptions)
  }

  public captureTransaction(id: string): Observable<any>{      
    return this.httpClient.get<any>(this.apiUrl+"/capture/" + id, this.httpOptions)
  }
}
