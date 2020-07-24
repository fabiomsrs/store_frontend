import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPageResponse } from '../model/userPageResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000/auth';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

    constructor(
        private httpClient: HttpClient
    ) {}

    public getUser(credentials): Observable<UserPageResponse>{
      return this.httpClient.post<any>(this.apiUrl + '/login', credentials, this.httpOptions)
    }

    public createUser(user: any): Observable<UserPageResponse>{      
      return this.httpClient.post<any>(this.apiUrl + '/register', user, this.httpOptions)
    }
}
