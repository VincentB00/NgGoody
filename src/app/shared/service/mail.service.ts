import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mail } from '../model/Response.model';

@Injectable({
  providedIn: 'root'
})
export class MailService 
{
  constructor(private httpClient: HttpClient) { }

  sendMail(mail: Mail): Observable<Response>
  {
    return this.httpClient.post<Response>(`${environment.api}/mails`, mail, {withCredentials: true});
  }

  sendAcceptOfferMail(offerID: number): Observable<Response>
  {
    return this.httpClient.post<Response>(`${environment.api}/mails/accept_offer/${offerID}`, null, {withCredentials: true});
  }

  sendDeclineOfferMail(offerID: number): Observable<Response>
  {
    return this.httpClient.post<Response>(`${environment.api}/mails/decline_offer/${offerID}`, null, {withCredentials: true});
  }

  sendPlaceOrderMail(orderID: number): Observable<Response>
  {
    return this.httpClient.post<Response>(`${environment.api}/mails/place_order/${orderID}`, null, {withCredentials: true});
  }

  autoSendAcceptOfferMail(offerID: number): void
  {
    this.httpClient.post<Response>(`${environment.api}/mails/accept_offer/${offerID}`, null, {withCredentials: true})
    .subscribe(res => {});
  }

  autoSendDeclineOfferMail(offerID: number): void
  {
    this.httpClient.post<Response>(`${environment.api}/mails/decline_offer/${offerID}`, null, {withCredentials: true})
    .subscribe(res => {});
  }

  autoSendPlaceOrderMail(orderID: number): void
  {
    this.httpClient.post<Response>(`${environment.api}/mails/place_order/${orderID}`, null, {withCredentials: true})
    .subscribe(res => {});
  }
}
