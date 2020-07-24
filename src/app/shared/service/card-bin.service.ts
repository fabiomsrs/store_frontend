import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardBinService {
  apiUrl = 'https://lookup.binlist.net/';
  
  constructor(
    private httpClient: HttpClient
  ) {}
  
  public getBin(card:any): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl + card)
  }
}
