import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import {OrderModule} from "ngx-order-pipe";
import {DateAgoPipe} from "../../Pipes/date-ago.pipe";
import {DateagoModule} from "../../Module/dateago/dateago.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OrdersPageRoutingModule,
        OrderModule,
        DateagoModule
    ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
