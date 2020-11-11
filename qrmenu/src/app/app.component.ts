import { Component, OnInit } from '@angular/core';

import {AlertController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {async} from "@angular/core/testing";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  playerId: any;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Orders',
      url: '/orders',
      icon: 'mail'
    },
    {
      title: 'Order Details',
      url: '/orderdetails',
      icon: 'paper-plane'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private onesignal: OneSignal,
    private alertCTRL: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.setupPush();
      }
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  setupPush() {
    this.onesignal.startInit('d4470a93-75ef-4931-ad07-dec1ef119db5', 'ODUwZjUyNTItYjQxYy00ZmI4LTkzMDktNzBjYzBkODc0MjQ3');
    this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.None);
    this.onesignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });
    this.onesignal.handleNotificationOpened().subscribe(data => {
      let additionalData = data.notification.payload.additionalData;
      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

    this.onesignal.endInit();

  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCTRL.create({
      header: title,
      subHeader: msg,
      buttons: [{
        text: `Action: ${{task}}`,
        handler: () => {

        }
      }]
    })
  }
}
