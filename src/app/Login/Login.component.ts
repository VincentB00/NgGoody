import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFail: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() 
  {
    if(this.authService.isLogin())
      this.router.navigate(['/home']).catch();
  }

  ngFormHandler(form: NgForm) 
  {
    this.authService.login(form.value)
    .subscribe(
      res => {this.authService.updateUser(), this.router.navigate(['/home']).catch()},
      error => this.loginFail = true
    );
  }
}
