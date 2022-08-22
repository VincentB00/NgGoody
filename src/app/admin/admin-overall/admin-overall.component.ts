import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-admin-overall',
  templateUrl: './admin-overall.component.html',
  styleUrls: ['./admin-overall.component.scss']
})
export class AdminOverallComponent implements OnInit 
{

  constructor(private userService: UserService) { }

  ngOnInit() 
  {
    this.userService.autoCheckAnyUserRoles(['admin', 'owner'], ['/home']);
  }
}
