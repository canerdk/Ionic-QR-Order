import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../Services/service";
import {AlertController, LoadingController, MenuController, NavController, ToastController} from "@ionic/angular";
import {AuthGuard} from "../../Services/auth-guard.service";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
  providers: [AuthGuard, AuthService]
})
export class OrderdetailsPage implements OnInit {
  quantity: any;
  selectedId: string;
  details: any;
  orderMain: any;
  payment: any;
  totalPrice: any = [];
  total: any = [];
  currency: any;
  result: any;

  constructor(
      private route: ActivatedRoute,
      private service: Service,
      private menu: MenuController,
      private navCTRL: NavController,
      public loadingController: LoadingController,
      public toastController: ToastController,
      public alertController: AlertController
  ) { }

  ngOnInit() {
    this.menu.enable(false);
    //Get id from url
    this.route.paramMap.subscribe(params=>{let id = params.get('id');
      this.selectedId = id
    });

    this.service.getOrderDetails1(this.selectedId).subscribe(data=>{
      this.details = data['value'];
      this.service.getSingleOrder(this.details[0].OrderMain).subscribe(data=>{
        this.orderMain = data;
      });
      this.currency = this.details[0].Currency;
      for (let i in this.details){
        this.total.push(parseFloat(this.details[i].TotalPrice));
      }
      this.totalPrice = this.total.reduce((acc, cur) => acc + cur, 0);
    });

  }



   onChange(q){
/*     let price = q.Quantity * q.Price;
     let totalPrice = price + q.TotalPrice;
    console.log(totalPrice);*/
     // let totalPrice = q.Quantity * q.Price;
    //this.service.updateOrderDetail({...q, TotalPrice: totalPrice});
  }

  async pay(o){
    let orderId = o[0].OrderMain;
    let note;
    this.service.getSingleOrder(orderId).subscribe(async data=>{
      this.orderMain = data;
      this.service.updateOrder({...this.orderMain, PaymentState: this.payment});
      if (this.payment === '0'){
        note = "not paid";
      }
      else{
        note = "paid";
      }
      const toast = await this.toastController.create({
        message: 'Payment changed as ' + note,
        duration: 2000,
        color: "warning"
      });
      await toast.present();
    });

  }

  sendToKitchen(o){
    let orderId = o[0].OrderMain;
    this.service.getSingleOrder(orderId).subscribe(data=>{
      this.orderMain = data;
      this.service.updateOrder({...this.orderMain, Confirmation: true, PaymentState: this.payment});
    });
    this.navCTRL.back();

  }

  async completed(o){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Order',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirm',
          handler: () => {
            let orderId = o[0].OrderMain;
            this.service.getSingleOrder(orderId).subscribe(data=>{
              this.orderMain = data;
              this.service.updateOrder({...this.orderMain, Complete: true});
            });
            this.navCTRL.back();
          }
        }
      ]
    });

    await alert.present();


  }

  async delete(o){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Order',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirm',
          handler: () => {
            let gcrecord = Math.floor((Math.random() * 10000) * 10000);
            let orderId = o[0].OrderMain;
            this.service.getSingleOrder(orderId).subscribe(data=>{
              this.orderMain = data;
              this.service.updateOrder({...this.orderMain, GCRecord: gcrecord});
            });
            this.navCTRL.back();
          }
        }
      ]
    });

    await alert.present();

  }



}
