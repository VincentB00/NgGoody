import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { OfferComponent } from './item/offer/offer.component';
import { LoginComponent } from './Login/Login.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: 'account',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'item/:id',
    // canActivate: [AuthGuard],
    component: ItemDetailComponent
  },
  {
    path: 'offer',
    component: OfferComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'order/:id',
    component: OrderDetailComponent
  },
  {
    path: "**",
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
