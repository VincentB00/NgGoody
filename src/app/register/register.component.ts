import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from, switchMap } from 'rxjs';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordColor: string = 'red';
  usernameError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  firstNameError: string = '';
  lastNameError: string = '';
  middleNameError: string = '';
  emailError: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  submitHandler(form: NgForm)
  {
    
  }

  checkValidUsername(form: NgForm)
  {
    this.userService.isValidUsername(form.value.username)
    .pipe(switchMap(() => this.userService.isValidUsername(form.value.username)))
    .subscribe(
      res => this.usernameError = 'username already exist',
      error => this.usernameError = ''
    );
  }

  checkPasswordStrength(form: NgForm)
  {
    let password = form.value.password;

    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if(strongRegex.test(password)) {
      this.passwordColor = "green";
    } else if(mediumRegex.test(password)) {
      this.passwordColor = "orange";
    } else {
      this.passwordColor = "red";
    }
  }

  checkValidEmail(form: NgForm)
  {
    let email :string = form.value.email;

    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.toLowerCase()))
      this.emailError = '';
    else
      this.emailError = "Please enter valid email";
  
    // if(!email.toLowerCase().match(
    //   '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
    // ))
    //   this.emailError = "Please enter valid email";
    // else
    //   this.emailError = '';
  }

  checkError(form: NgForm)
  {

    this.confirmPasswordError = '';
    this.firstNameError = '';
    this.lastNameError = '';

    if(!form.value.password)
      this.passwordError = "Password can't be empty";

    if(form.value.password !== form.value.confirmPassword)
      this.confirmPasswordError = "Password and re-Password must match";

    if(!form.value.first_name)
      this.firstNameError = "First name can't be empty";

    if(!form.value.last_name)
      this.lastNameError = "Last name can't be empty";

    if(!form.value.email)
      this.emailError = "Email can't be empty";
  }

  isValidForm(form: NgForm): boolean
  {
    this.checkError(form);

    return !this.usernameError &&
    !this.passwordError &&
    !this.confirmPasswordError &&
    !this.firstNameError &&
    !this.lastNameError &&
    !this.middleNameError &&
    !this.emailError;
  }

  register(form: NgForm)
  {
    if(this.isValidForm(form))
    {
      this.userService.registerUser(form.value)
      .subscribe(
        res => this.router.navigate(['/login']),
        err => {window.alert("server encounter unexpected error, please try again latter"); console.log(err)}
      );
    }
  }

}
