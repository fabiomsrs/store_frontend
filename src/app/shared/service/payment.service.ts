import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'http://localhost:3000/payments';
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

    public getPayments(): Observable<any>{
      return this.httpClient.get<any>(this.apiUrl, this.httpOptions)
    }

    public getPaymentById(id: string): Observable<any>{
      return this.httpClient.get<any>(this.apiUrl + "/"+ id, this.httpOptions)
    }

    public createPayment(payment: any): Observable<any>{      
      return this.httpClient.post<any>(this.apiUrl, payment, this.httpOptions)
    }
}
