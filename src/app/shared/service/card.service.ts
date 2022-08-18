import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../model/order.model';
import { Response } from '../model/Response.model';

@Injectable({
  providedIn: 'root'
})
export class CardService 
{

  constructor(private httpClient: HttpClient) { }

  getAllCards(): Observable<Card[]>
  {
    return this.httpClient.get<Card[]>(`${environment.api}/cards`, {withCredentials: true});
  }

  saveCard(card: Card): Observable<Response>
  {
    return this.httpClient.post<Response>(`${environment.api}/cards`, card, {withCredentials: true})
  }

  modifyCard(card: Card): Observable<Response>
  {
    return this.httpClient.put<Response>(`${environment.api}/cards`, card, {withCredentials: true})
  }

  deleteCard(card: Card): Observable<Response>
  {
    return this.httpClient.delete<Response>(`${environment.api}/cards/${card.id}`, {withCredentials: true})
  }
}
