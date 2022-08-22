import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Report } from 'src/app/shared/model/Item.model';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialog implements OnInit {

  report: Report = {
    reason: '',
    message: '',
  };

  constructor() { }

  ngOnInit() 
  {
    
  }

}
