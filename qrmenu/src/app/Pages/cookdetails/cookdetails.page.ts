import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Service} from "../../Services/service";
import {LoadingController, MenuController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-cookdetails',
  templateUrl: './cookdetails.page.html',
  styleUrls: ['./cookdetails.page.scss'],
})
export class CookdetailsPage implements OnInit {
  quantity: any;
  selectedId: string;
  details: any;
  orderMain: any;

  constructor(
      private route: ActivatedRoute,
      private service: Service,
      private menu: MenuController,
      private navCTRL: NavController,
      public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.menu.enable(false);
    //Get id from url
    this.route.paramMap.subscribe(params=>{let id = params.get('id');
      this.selectedId = id
    });

    this.service.getOrderDetails1(this.selectedId).subscribe(data=>{
      this.details = data['value'];
    });
  }

  onChange(q){
    let totalPrice = q.Quantity * q.Price;
    this.service.updateOrderDetail({...q, TotalPrice: totalPrice});
  }

  preparing(o){
    let orderId = o[0].OrderMain;
    this.service.getSingleOrder(orderId).subscribe(data=>{
      this.orderMain = data;
      this.service.updateOrder({...this.orderMain, PrepareState: 1});
    });
    this.navCTRL.back();
  }
  prepared(o){
    let orderId = o[0].OrderMain;
    this.service.getSingleOrder(orderId).subscribe(data=>{
      this.orderMain = data;
      this.service.updateOrder({...this.orderMain, PrepareState: 2});
    });
    this.navCTRL.back();
  }


}
