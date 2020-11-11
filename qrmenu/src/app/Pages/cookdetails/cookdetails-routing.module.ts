import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookdetailsPage } from './cookdetails.page';

const routes: Routes = [
  {
    path: '',
    component: CookdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookdetailsPageRoutingModule {}
