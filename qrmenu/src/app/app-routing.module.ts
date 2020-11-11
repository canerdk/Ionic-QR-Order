import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./Services/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'orders/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'orderdetails/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Pages/orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule)
  },
  {
    path: 'cook/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Pages/cook/cook.module').then( m => m.CookPageModule)
  },
  {
    path: 'cookdetails/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Pages/cookdetails/cookdetails.module').then( m => m.CookdetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
