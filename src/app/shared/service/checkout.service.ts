import { Injectable } from '@angular/core';
import { Offer } from '../model/Item.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  offer!: Offer;

constructor() { }

}
