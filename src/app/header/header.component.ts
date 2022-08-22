import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() 
  {
    this.authService.updateUser();
  }

  getUserName(): string
  {
    let user = this.authService.getUser();
    return user.first_name + " " + user.last_name;
  }

  signOut()
  {
    this.authService.logout()
    .subscribe(
      res => this.authService.clearUser(),
      error => this.authService.clearUser()
    );
  }

  isAdmin(): boolean
  {
    let user = this.authService.getUser();
    return user.userRoles.some((role) => role.type.toLowerCase() === 'admin' || role.type.toLowerCase() === 'owner');
  }
}
