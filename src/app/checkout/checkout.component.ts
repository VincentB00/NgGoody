import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialog } from '../dialog/confirm-dialog/confirm-dialog.component';
import { Item, Offer } from '../shared/model/Item.model';
import { Card, ShippingAddress } from '../shared/model/order.model';
import { AddressService } from '../shared/service/address.service';
import { CardService } from '../shared/service/card.service';
import { CheckoutService } from '../shared/service/checkout.service';
import { OfferService } from '../shared/service/offer.service';
import { OrderService } from '../shared/service/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  offer?: Offer;
  item?: Item;
  shippingAddress: ShippingAddress = {
    label:         '',
    reciever_name: '',
    phone_number:  '',
    address:       '',
    city:          '',
    state:         '',
    zip:           0
  }
  shippingAddresses: ShippingAddress[] = [];

  cards: Card[] = [];
  card: Card = {
    number: 0,
    valid_month: 0,
    valid_year:  0,
    name:        '',
    cvc:         0,
  };

  constructor(
    private checkoutService: CheckoutService,
    private addressService: AddressService,
    public dialog: MatDialog,
    private cardService: CardService,
    private offerService: OfferService,
    private orderService: OrderService,
    private router: Router
    ) { }

  ngOnInit(): void 
  {
    this.offer = this.checkoutService.offer;
    this.item = this.offer?.item
    this.reloadAddress();
    this.reloadCards();
  }

  reloadAddress()
  {
    this.addressService.getAllAddresses()
    .subscribe(
      res => this.shippingAddresses = res,
      error => this.shippingAddresses = []
    );
  }

  reloadCards()
  {
    this.cardService.getAllCards()
    .subscribe(
      res => this.cards = res,
      error => this.cards = []
    );
  }

  saveCurrentAddress()
  {
    let address = structuredClone(this.shippingAddress);
    let oldAddress = this.shippingAddresses.find((a) => a.label === address.label);
    
    if(oldAddress)
    {
      address.id = oldAddress.id;
      this.addressService.modifyAddress(address)
      .subscribe(
        res => this.reloadAddress()
      );
    }
    else
    {
      delete address.id;
      this.addressService.saveAddress(address)
      .subscribe(
        res => this.reloadAddress()
      );
    }
  }

  useThis(address: ShippingAddress): void
  {
    this.shippingAddress = structuredClone(address);
  }

  removeThis(address: ShippingAddress): void
  {
    let dialog = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Remove Address book',
        message: 'Are you sure you want to remove this address book'
      }
    });

    dialog.afterClosed().subscribe(
      result => {
        if(result === 'yes')
        {
          this.addressService.deleteAddress(address)
          .subscribe(
            res => {},
            error => {},
            () => this.reloadAddress()
          );
        }
      }
    )
  }

  saveCard()
  {
    this.cardService.saveCard(this.card)
    .subscribe(
      res => {},
      () => {},
      () => this.reloadCards()
    );
  }

  deleteCard(card: Card)
  {
    let dialog = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Remove Card',
        message: 'Are you sure you want to remove this Card'
      }
    });

    dialog.afterClosed().subscribe(
      result => {
        if(result === 'yes')
        {
          this.cardService.deleteCard(this.card)
          .subscribe(
            res => {},
            () => {},
            () => this.reloadCards()
          );
        }
      }
    )
  }

  useCard(card: Card)
  {
    this.card = structuredClone(card);
  }

  placeOrder()
  {
    if(this.offer)
      this.orderService.createOrder(this.offer, this.shippingAddress)
      .subscribe(
        res => {
          this.router.navigate(['/account/my_order'])
        },
        error => window.alert(error)
      );
  }
}
