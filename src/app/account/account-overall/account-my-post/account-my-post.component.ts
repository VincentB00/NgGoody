import { Component, OnInit } from '@angular/core';
import { Item, Offer } from 'src/app/shared/model/Item.model';
import { User } from 'src/app/shared/model/User.model';
import { ItemService } from 'src/app/shared/service/item.service';
import { MailService } from 'src/app/shared/service/mail.service';
import { OfferService } from 'src/app/shared/service/offer.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-account-my-post',
  templateUrl: './account-my-post.component.html',
  styleUrls: ['./account-my-post.component.scss']
})
export class AccountMyPostComponent implements OnInit {

  items: Item[] = [];
  offers: Offer[] = [];

  constructor(
    private itemService: ItemService, 
    public offerService: OfferService, 
    private mailService: MailService,
    public userService: UserService) { }

  ngOnInit(): void 
  {
    this.itemService.getItems()
    .subscribe(
      res => this.items = res
    );
    this.updateOffers();
  }

  seeOffers(item: Item)
  {
    this.offerService.getOffers(item.id!)
    .subscribe(
      res => this.offers = res
    );
  }

  updateOffers()
  {
    this.offerService.getAllBuyerOffers()
    .subscribe(
      res => this.offers = res
    );
  }

  getAllOfferByStatus(status: string)
  {
    let offers: Offer[] = [];
    
    this.offers!.forEach((offer) => {
      if(offer.status === status)
        offers.push(offer)
    })

    return offers;
  }

  getLineHeight(value: string): string
  {
    let lines: string[] = value.split('\n');

    return (lines.length * 21) + 'px';
  }

  acceptOffer(offer: Offer)
  {
    offer.status = 'ACCEPTED';
    this.offerService.modifyOffer(offer)
    .subscribe(
      res => {
        this.mailService.autoSendAcceptOfferMail(offer.id!);
      }
    );
  }

  declineOffer(offer: Offer)
  {
    offer.status = 'DECLINED';
    this.offerService.modifyOffer(offer)
    .subscribe(
      res => {this.mailService.autoSendDeclineOfferMail(offer.id!);}
    );
  }
}
