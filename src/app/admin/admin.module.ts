import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Route, RouterModule, Routes } from "@angular/router";
import { CustomStyleModule } from "../shared/modules/custome-style/custome-style.module";
import { AdminOverallComponent } from "./admin-overall/admin-overall.component";
import { AdminReportedPostComponent } from "./admin-overall/admin-reported-post/admin-reported-post.component";

const routes: Routes = [
    {
        path: '',
        component: AdminOverallComponent,
        children: [
            {
                path: 'reported_post',
                component: AdminReportedPostComponent
            }
        ]
    }
]

@NgModule({
    declarations: [
        AdminOverallComponent,
        AdminReportedPostComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CustomStyleModule,
        RouterModule.forChild(routes)
    ],
    exports: [

    ]
})
export class AdminModule {}