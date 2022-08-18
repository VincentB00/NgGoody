import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, Item } from '../model/Item.model';
import { Response } from '../model/Response.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService 
{
  private conditions: {condition: string}[] = [
    {condition: 'New'},
    {condition: 'Used'},
    {condition: 'Digital Good'},
    {condition: 'Brand new'},
    {condition: 'Like new'},
    {condition: 'Very good'},
    {condition: 'Good'},
    {condition: 'Acceptable'},
    {condition: 'Open box'},
    {condition: 'Certified refurbished'},
    {condition: 'Seller refurbished'},
    {condition: 'Excellent - Refurbished'},
    {condition: 'Very Good - Refurbished'},
    {condition: 'Good - Refurbished'},
    {condition: 'Refurbished'},
    {condition: 'For parts'},
    {condition: 'Not working'},
    {condition: 'Damaged'},
    {condition: 'Retread'},
  ];

constructor(private httpClient: HttpClient, private userService: UserService) { }

  getConditions(): {condition: string}[]
  {
    return this.conditions
  }

  createItem(item: Item): Observable<Item>
  {
    return this.httpClient.post<Item>(`${environment.api}/items`, JSON.stringify(item), {withCredentials: true});
  }

  getItem(itemID: number): Observable<Item>
  {
    return this.httpClient.get<Item>(`${environment.api}/items/${itemID}`);
  }

  getAllItem(): Observable<Item[]>
  {
    return this.httpClient.get<Item[]>(`${environment.api}/items/all`);
  }

  isOwner(itemID: number): Observable<Response>
  {
    return this.httpClient.get<Response>(`${environment.api}/items/is_owner/${itemID}`, {withCredentials: true});
  }

  getItems(): Observable<Item[]>
  {
    return this.httpClient.get<Item[]>(`${environment.api}/items`, {withCredentials: true});
  }

  modifyItem(originItemID: number, target: Item): Observable<Response>
  {
    return this.httpClient.put<Response>(`${environment.api}/items/${originItemID}`, JSON.stringify(target), {withCredentials: true})
  }

  getAllCategory(): Observable<Category[]>
  {
    return this.httpClient.get<Category[]>(`${environment.api}/categories`);
  }
}
