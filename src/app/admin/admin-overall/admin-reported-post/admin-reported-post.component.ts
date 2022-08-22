import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { Item, Report } from 'src/app/shared/model/Item.model';
import { ItemService } from 'src/app/shared/service/item.service';
import { ReportService } from 'src/app/shared/service/report.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-reported-post',
  templateUrl: './admin-reported-post.component.html',
  styleUrls: ['./admin-reported-post.component.scss']
})
export class AdminReportedPostComponent implements OnInit {

  reports: Report[] = [];

  constructor(
    public reportSerive: ReportService,
    private itemService: ItemService,
    private matDialog: MatDialog,
    ) { }

  ngOnInit() 
  {
    this.reloadReport();
  }

  reloadReport()
  {
    this.reportSerive.getAll().subscribe(
      res => this.reports = res
    );
  }

  getAllReport(status: string): Report[]
  {
    return this.reports.filter((r) => r.status === status);
  }
  
  resolveReport(report: Report)
  {
    report.status = 'RESOLVE';

    this.reportSerive.modifyReport(report).subscribe(
      res => {this.reloadReport();}
    );
  }

  bandItem(report: Report)
  {
    let dialog = this.matDialog.open(ConfirmDialog, {data: {title: "Band this item?", message: "You are about to band this item\nare you sure?"}});
  
    dialog.afterClosed().subscribe(
      res => {
        if(res)
        {
          this.itemService.bandItem(report.item!.id!).subscribe(
            res => {
              this.resolveReport(report)
            }
          );
        }
      }
    );
  }

  removeReport(report: Report)
  {
    this.reportSerive.deleteReport(report.id!).subscribe(
      res => {
        this.reloadReport();
      }
    );
  }
}
