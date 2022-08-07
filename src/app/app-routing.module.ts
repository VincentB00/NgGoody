import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Login/Login.component';
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
    path: "**",
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
