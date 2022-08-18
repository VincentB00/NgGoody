import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShippingAddress } from '../model/order.model';
import { Response } from '../model/Response.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

constructor(private httpClient: HttpClient) { }

  getAllAddresses(): Observable<ShippingAddress[]>
  {
    return this.httpClient.get<ShippingAddress[]>(`${environment.api}/shippings`, {withCredentials: true});
  }

  saveAddress(address: ShippingAddress): Observable<Response>
  {
    delete address.user;
    return this.httpClient.post<Response>(`${environment.api}/shippings`, address, {withCredentials: true});
  }

  modifyAddress(address: ShippingAddress): Observable<Response>
  {
    delete address.user;
    return this.httpClient.put<Response>(`${environment.api}/shippings/${address.id}`, address, {withCredentials: true});
  }

  deleteAddress(address: ShippingAddress): Observable<Response>
  {
    return this.httpClient.delete<Response>(`${environment.api}/shippings/${address.id}`, {withCredentials: true});
  }

}
