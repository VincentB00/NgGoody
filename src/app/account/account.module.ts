import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountInformationComponent } from "./account-overall/account-information/account-information.component";
import { AccountOverallComponent } from './account-overall/account-overall.component';
import {MatListModule} from '@angular/material/list';

const routes: Routes = [
    {
        path: '',
        component: AccountOverallComponent,
        children: [
            {
                path: 'information',
                component: AccountInformationComponent
            }
        ]
    }
]

@NgModule({
    declarations: [
        AccountInformationComponent,
        AccountOverallComponent
      ],
      imports: [
        CommonModule,
        MatListModule,
        RouterModule.forChild(routes)
      ]
})
export class AccountModule {}