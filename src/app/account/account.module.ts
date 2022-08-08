import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountInformationComponent } from "./account-overall/account-information/account-information.component";
import { AccountOverallComponent } from './account-overall/account-overall.component';
import { FormsModule } from "@angular/forms";
import { CustomStyleModule } from "../shared/modules/custome-style/custome-style.module";

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
        FormsModule,
        CustomStyleModule,
        RouterModule.forChild(routes)
      ]
})
export class AccountModule {}