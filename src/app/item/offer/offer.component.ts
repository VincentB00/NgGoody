import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, Offer } from 'src/app/shared/model/Item.model';
import { CheckoutService } from 'src/app/shared/service/checkout.service';
import { ItemService } from 'src/app/shared/service/item.service';
import { OfferService } from 'src/app/shared/service/offer.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit 
{
  editable: boolean = false;
  item!: Item;
  offer!: Offer;
  accceptOffer?: Offer;

  constructor(
    private offerService: OfferService, 
    private userService: UserService,
    private ar: ActivatedRoute,
    private router: Router,
    private location: Location,
    private checkoutService: CheckoutService) { }

  ngOnInit(): void 
  {
    this.item = this.offerService.offerItem!;

    if(!this.item)
      this.location.back();

    this.offerService.getOfferOn(this.item.id!)
    .subscribe(
      res => {
        this.offer = res; 
        this.editable = true;
        this.accceptOffer = structuredClone(res);
      },
      error => {
        this.offer = {
          item: this.item!,
          user: this.userService.getCurrentLoginUser(),
          price: 0,
          quantity: 1,
          message: '',
        }
      }
    );
  }

  getLineHeight(value: string): string
  {
    let lines: string[] = value.split('\n');

    return (lines.length * 21) + 'px';
  }

  makeOffer(): void
  {
    this.offerService.makeOffer(this.offer)
    .subscribe(
      res => this.router.navigate(['/home']),
      error => window.alert("Server encounter unknow error please try again latter")
    );
  }

  updateOffer()
  {
    this.offer.status = "PENDING";
    this.offerService.modifyOffer(this.offer)
    .subscribe(
      res => {this.router.navigate(['/account'])},
      error => {window.alert("Something when wrong, please try again latter")}
    );
  }

  placeOrder(offer: Offer): void
  {
    this.checkoutService.offer = this.accceptOffer!;
    this.router.navigate(['/checkout'])
  }
}
