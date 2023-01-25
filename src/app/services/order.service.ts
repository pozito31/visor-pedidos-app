import {AngularFireDatabase} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { forEach } from 'lodash-es'
import { IOrder } from '../interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afd: AngularFireDatabase) { }

  getOrders(): Observable<IOrder[]>{
    return this.afd.list<IOrder>('orders').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          const order = c.payload.val();
          if(!order.finished){
            order.finished = false;
          }
          if(!order.id){
            order.id = c.payload.key;
          }

          return order;
        })
      })
    )
  }

  editOrder(order: IOrder): Promise<void> {
    return this.afd.object('/orders/'+order.id).set(order);
  }

  deleteOrder(idOrder: string): Promise<void>{
    return this.afd.object('/orders/' + idOrder).remove();
  }

}
