import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./Services/auth-guard.service";
import {AuthService} from "./Services/auth.service";
import {OneSignal} from "@ionic-native/onesignal/ngx";
import { DateAgoPipe } from './Pipes/date-ago.pipe';
import {DateagoModule} from "./Module/dateago/dateago.module";


@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        DateagoModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        AuthGuard,
        AuthService,
        OneSignal
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
