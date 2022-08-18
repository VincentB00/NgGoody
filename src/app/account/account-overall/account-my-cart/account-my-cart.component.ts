import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item, Offer } from 'src/app/shared/model/Item.model';
import { OfferService } from 'src/app/shared/service/offer.service';

@Component({
  selector: 'app-account-my-cart',
  templateUrl: './account-my-cart.component.html',
  styleUrls: ['./account-my-cart.component.scss']
})
export class AccountMyCartComponent implements OnInit {

  offers: Offer[]= [];

  constructor(
    public offerService: OfferService,
    private router: Router) { }

  ngOnInit(): void 
  {
    this.offerService.getAllSellerOffers()
    .subscribe(
      res => this.offers = res,
      error => this.offers = []
    );
  }

  getAllItemByStatus(status: string): Item[]
  {
    let items: Item[] = [];
    
    this.offers.forEach((offer) => {
      if(offer.status === status)
        items.push(offer.item)
    })

    return items;
  }

  getAllOfferByStatus(status: string)
  {
    let offers: Offer[] = [];
    
    this.offers.forEach((offer) => {
      if(offer.status === status)
        offers.push(offer)
    })

    return offers;
  }

  goToOffer(offer: Offer)
  { 
    this.offerService.offerItem = offer.item;
    this.router.navigate(['/offer']);
  }

}
