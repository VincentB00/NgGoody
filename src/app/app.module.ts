import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { NgVarDirective } from './shared/directives/ng-var.directive';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { CustomStyleModule } from './shared/modules/custome-style/custome-style.module';
import { OfferComponent } from './item/offer/offer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthIntercepter } from './shared/service/auth.intercepter';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [				
    AppComponent,
      HeaderComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
      NgVarDirective,
      ItemDetailComponent,
      OfferComponent,
      CheckoutComponent,
      OrderDetailComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomStyleModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercepter,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
