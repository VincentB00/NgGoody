import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item, Offer } from '../model/Item.model';
import { Response } from '../model/Response.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService 
{

  private statusTypes: {status: string}[] = [
    {
      status: 'PENDING'
    },
    {
      status: 'DECLINED'
    },
    {
      status: 'ACCEPTED'
    },
    {
      status: 'FULLFILLED'
    },
  ]

  offerItem?: Item;

  constructor(private httpClient: HttpClient) { }

  getStatusTypes(): {status: string}[]
  {
    return this.statusTypes;
  }

  makeOffer(offer: Offer): Observable<Response>
  {
    delete offer.create_time;
    delete offer.user;
    
    return this.httpClient.post<Response>(`${environment.api}/offers/${offer.item.id}`, JSON.stringify(offer), {withCredentials: true})
  }

  getAllBuyerOffers(): Observable<Offer[]>
  {
    return this.httpClient.get<Offer[]>(`${environment.api}/offers/items`, {withCredentials: true});
  }

  getOffers(itemID: number): Observable<Offer[]>
  {
    return this.httpClient.get<Offer[]>(`${environment.api}/offers/${itemID}`, {withCredentials: true});
  }

  getOfferOn(itemID: number): Observable<Offer>
  {
    return this.httpClient.get<Offer>(`${environment.api}/offers/items/${itemID}`, {withCredentials: true});
  }

  getAllSellerOffers(): Observable<Offer[]>
  {
    return this.httpClient.get<Offer[]>(`${environment.api}/offers`, {withCredentials: true});
  }

  modifyOffer(offer: Offer): Observable<Response>
  {
    delete offer.create_time;
    delete offer.user?.create_time;

    return this.httpClient.put<Response>(`${environment.api}/offers/${offer.id}`, offer, {withCredentials: true})
  }

}
