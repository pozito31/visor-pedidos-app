import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IOrder } from '../../interfaces/iorder';
import { OrderService } from '../../services/order.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Product } from '../../models/product';
import { TranslateService } from '../../services/translate.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-see-orders-employee',
  templateUrl: './see-orders-employee.component.html',
  styleUrls: ['./see-orders-employee.component.css']
})
export class SeeOrdersEmployeeComponent implements OnInit {
 public orders: IOrder[];

  @ViewChild("modal_success", {static: false}) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", {static: false}) modal_error: TemplateRef<any>;
  @ViewChild("modal_confirm", {static: false}) modal_confirm: TemplateRef<any>;

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe( orders => {
      this.orders = orders.sort( (a,b) => a.numOrder - b.numOrder);
    })

  }

  printOrder(order: IOrder){
    if (order.products) {


      const bodyTable: any = [
        [
          {
            text: this.translateService.getTranslate('label.product'),
            style: 'headerCell'
          },
          {
            text: this.translateService.getTranslate('label.extras'),
            style: 'headerCell'
          },
          {
            text: this.translateService.getTranslate('label.quantity'),
            style: 'headerCell'
          },
          {
            text: this.translateService.getTranslate('label.price'),
            style: 'headerCell'
          }
        ]
      ];

      order.products.forEach(p => {

        const product: Product = new Product(p);

        let extras = [];

        if (product.extras) {
          product.extras.forEach(e => {
            extras.push(
              {
                text: [
                  {
                    text: this.translateService.getTranslate(e.name) + ':  ',
                    bold: true
                  },
                  this.translateService.getTranslate(e.selected)
                ]
              }
            );
          })
        }

        const row: any = [
          {
            text: this.translateService.getTranslate(product.name)
          },
          {
            ul: extras
          },
          {
            text: product.quantity,
            alignment: 'center'
          },
          {
            text: product.price.toFixed(2) + '€',
            alignment: 'center'
          }
        ]

        bodyTable.push(row);

      })

      bodyTable.push(
        [
          {
            colSpan: 2,
            text: ''
          },
          {},
          {
            text: this.translateService.getTranslate('label.price.without.iva')
          },
          {
            text: order.priceOrder.toFixed(2) + '€',
            alignment: 'center'
          }
        ]
      );


      bodyTable.push(
        [
          {
            colSpan: 2,
            text: ''
          },
          {},
          {
            text: this.translateService.getTranslate('label.price.with.iva')
          },
          {
            text: (order.priceOrder * 1.21).toFixed(2) + '€',
            alignment: 'center'
          }
        ]
      );

      const self = this;

      const pdfDefinition = {
        info: {
          title: this.translateService.getTranslate('label.num.order') + order.numOrder
        },
        header: {
          margin: [40, 10, 40, 10],
          columns: [
            {
            image: "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAHBAZETAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDBCNTExMzQ0OEYzMTFFOThFMUFFNEE5MkVBQzQ3MTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDBCNTExMzM0OEYzMTFFOThFMUFFNEE5MkVBQzQ3MTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjA3MjkyNUEwRUEwNDMzMzJGMzlBODNCREQyQkJGMjNFIiBzdFJlZjpkb2N1bWVudElEPSIwNzI5MjVBMEVBMDQzMzMyRjM5QTgzQkREMkJCRjIzRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pqp52TkAAFltSURBVHjajFLNaxNBFJ+Z3exu6G7apmoIXWp2tbAh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",
            width: 60,
            height: 60
            },
            {
              text: this.translateService.getTranslate('label.app'),
              alignment: 'center',
              fontSize: 23,
              bold: true,
              margin: [-40, 0, 0, 0]
            }
          ]
        },
        content: [
          {
            alignment: 'center',
            text: this.translateService.getTranslate('label.num.order') + order.numOrder,
            fontSize: 18,
            margin: [10, 40, 10, 10]
          },
          {
            table: {
              widths: ['25%', '40%', '15%', '20%'],
              body: bodyTable
            }
          }
        ],
        footer: function(currentPage, pageCount) {
          return [
            {
              text: currentPage + ' ' + self.translateService.getTranslate('label.of') + ' ' + pageCount,
              alignment: 'right',
              margin: [0, 0, 40, 0]
            }
          ]
        },
        styles: {
          headerCell: {
            fillColor: 'black',
            color: 'white',
            alignment: 'center'
          }
        }
      }

      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();

    }
  }

  finishOrder(order: IOrder){
    order.finished = true;
    this.orderService.editOrder(order).then( () => {
      this.modalService.open(this.modal_success);
    }).catch( (error) => {
      console.error(error);
      this.modalService.open(this.modal_error);
    })
  }

  deleteOrder(order: IOrder){
    this.modalService.open(this.modal_confirm).result.then( result => {
      if(result == 'yes'){
        this.orderService.deleteOrder(order.id).then( () => {
          this.modalService.open(this.modal_success);
        }).catch( (error) => {
          console.error(error);
          this.modalService.open(this.modal_error);
        })
      }
    })
  }

}
