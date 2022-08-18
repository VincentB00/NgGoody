import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../shared/model/Item.model';
import { Order } from '../shared/model/order.model';
import { OrderService } from '../shared/service/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order!: Order;
  item!: Item;

  constructor(private orderService: OrderService, private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
  {
    let orderID = this.ar.snapshot.params['id'];

    this.orderService.getOrder(orderID)
    .subscribe(
      res => {
        this.order = res;
        this.item = res.item;
        this.orderService.isRelated(orderID)
        .subscribe(
          res => {},
          error => this.router.navigate(['home'])
        );
      },
      error => this.router.navigate(['home'])
    );

  }

}
