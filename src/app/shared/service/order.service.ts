import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer } from '../model/Item.model';
import { Order, ShippingAddress } from '../model/order.model';
import { Response } from '../model/Response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private httpClient: HttpClient) { }

  getOrder(orderID: number): Observable<Order>
  {
    return this.httpClient.get<Order>(`${environment.api}/orders/${orderID}`, {withCredentials: true});
  }

  isRelated(orderID: number): Observable<Response>
  {
    return this.httpClient.get<Response>(`${environment.api}/orders/is_related/${orderID}`, {withCredentials: true});
  }

  getAllBuyingOrders(): Observable<Order[]>
  {
    return this.httpClient.get<Order[]>(`${environment.api}/orders/buying`, {withCredentials:true});
  }

  getAllSellingOrders(): Observable<Order[]>
  {
    return this.httpClient.get<Order[]>(`${environment.api}/orders/selling`, {withCredentials:true});
  }

  createOrder(offer: Offer, shippingAddress: ShippingAddress): Observable<Response>
  {
    delete shippingAddress.user;
    return this.httpClient.post<Response>(`${environment.api}/orders/offer/${offer.id}`, shippingAddress, {withCredentials:true});
  }
}
