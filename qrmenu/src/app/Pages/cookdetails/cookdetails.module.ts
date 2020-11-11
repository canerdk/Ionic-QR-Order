import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CookdetailsPageRoutingModule } from './cookdetails-routing.module';

import { CookdetailsPage } from './cookdetails.page';
import {OrderModule} from "ngx-order-pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CookdetailsPageRoutingModule,
        OrderModule
    ],
  declarations: [CookdetailsPage]
})
export class CookdetailsPageModule {}
