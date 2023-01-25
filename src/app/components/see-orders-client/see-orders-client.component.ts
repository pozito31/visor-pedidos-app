import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { IOrder } from '../../interfaces/iorder';

@Component({
  selector: 'app-see-orders-client',
  templateUrl: './see-orders-client.component.html',
  styleUrls: ['./see-orders-client.component.css']
})
export class SeeOrdersClientComponent implements OnInit {

  public orders: IOrder[];

  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders.sort( (a,b) => a.numOrder - b.numOrder);
    })
  }

}
