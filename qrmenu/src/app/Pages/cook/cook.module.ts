import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CookPageRoutingModule } from './cook-routing.module';

import { CookPage } from './cook.page';
import {DateagoModule} from "../../Module/dateago/dateago.module";
import {OrderModule} from "ngx-order-pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CookPageRoutingModule,
        DateagoModule,
        OrderModule
    ],
  declarations: [CookPage]
})
export class CookPageModule {}
