import { Component, OnInit } from '@angular/core';
import { Item, Offer } from 'src/app/shared/model/Item.model';
import { Order } from 'src/app/shared/model/order.model';
import { CheckoutService } from 'src/app/shared/service/checkout.service';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-account-my-order',
  templateUrl: './account-my-order.component.html',
  styleUrls: ['./account-my-order.component.scss']
})
export class AccountMyOrderComponent implements OnInit {

  buyingOrders: Order[] = [];
  sellingOrders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void 
  {
    this.orderService.getAllBuyingOrders()
    .subscribe(
      res => this.buyingOrders = res
    );

    this.orderService.getAllSellingOrders()
    .subscribe(
      res => this.sellingOrders = res
    );
  }

  cancelOrder(order: Order): void
  {
    order.status = 'CANCEL BY BUYER';
    this.orderService.modifyOrder(order).subscribe(
      res => {}
    );
  }

}
