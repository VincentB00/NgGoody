import { NgModule } from '@angular/core';

import {CdkTableModule} from '@angular/cdk/table';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatBadgeModule} from "@angular/material/badge";
import {MatRadioModule} from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { FilterNamePipe } from '../../pipes/filter-name.pipe';
import { ConfirmDialog } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { FilterNameReversePipe } from '../../pipes/filter-name-reverse.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ReportDialog } from 'src/app/dialog/report-dialog/report-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    FilterNamePipe,
    ConfirmDialog,
    FilterNameReversePipe,
    ReportDialog
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatBadgeModule,
    MatRadioModule,
    MatExpansionModule,
    CdkTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatBadgeModule,
    MatRadioModule,
    MatExpansionModule,
    CdkTableModule,
    MatMenuModule,
    MatFormFieldModule,
    FilterNamePipe,
    ConfirmDialog,
    FilterNameReversePipe,
    MatPaginatorModule,
    ReportDialog
  ]
})
export class CustomStyleModule { }
