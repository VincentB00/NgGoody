import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountInformationComponent } from "./account-overall/account-information/account-information.component";
import { AccountOverallComponent } from './account-overall/account-overall.component';
import { FormsModule } from "@angular/forms";
import { CustomStyleModule } from "../shared/modules/custome-style/custome-style.module";
import { AccountMyPostComponent } from './account-overall/account-my-post/account-my-post.component';
import { AccountMyCartComponent } from './account-overall/account-my-cart/account-my-cart.component';
import { FilterNamePipe } from "../shared/pipes/filter-name.pipe";
import { AccountMyOrderComponent } from './account-overall/account-my-order/account-my-order.component';

const routes: Routes = [
    {
        path: '',
        component: AccountOverallComponent,
        children: [
            {
                path: 'information',
                component: AccountInformationComponent
            },
            {
                path: 'my_post',
                component: AccountMyPostComponent
            },
            {
                path: 'my_offer',
                component: AccountMyCartComponent
            },
            {
                path: 'my_order',
                component: AccountMyOrderComponent
            },
        ]
    }
]

@NgModule({
    declarations: [
        AccountInformationComponent,
        AccountOverallComponent,
        AccountMyPostComponent,
        AccountMyCartComponent,
        AccountMyOrderComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        CustomStyleModule,
        RouterModule.forChild(routes)
      ]
})
export class AccountModule {}