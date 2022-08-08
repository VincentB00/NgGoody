import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/User.model';
import { UserService } from 'src/app/shared/service/user.service';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent implements OnInit {

  display1: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  display4: boolean = false;
  display5: boolean = false;

  user!: User;

  passwordStrength: string = '';
  changePasswordError: string = '';
  modifyInformationError: string = '';

  constructor(public userService: UserService) { }

  ngOnInit() 
  {
    this.resetUser();
  }

  resetUser()
  {
    this.user = structuredClone(this.userService.getCurrentLoginUser());
  }

  modifyUser(): void
  {
    let firstName = this.user.first_name;
    let lastName = this.user.last_name;
    let email = this.user.email;
    this.modifyInformationError = "";

    if(!firstName)
      this.modifyInformationError += "\nFirst name can't be empty";

    if(!lastName)
      this.modifyInformationError += "\nLast name can't be empty";

    if(!email)
      this.modifyInformationError += "\nEmail can't be empty";

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
      this.modifyInformationError += "\nPlease enter valid email";

    if(!this.modifyInformationError)
    {
      let tempUser = structuredClone(this.user);
  
      this.userService.modifyCurrentLoginUser(tempUser)
      .subscribe(
        res => {this.diableEdit(); this.userService.updateUser();},
        err => {this.modifyInformationError = "Sorry we encounter some technicle difficulty at the moment, please try again latter"}
      );
      

      
    }
  }

  enableEdit()
  {
    this.display1 = true;
    this.display2 = true;
    this.display3 = true;
    this.display4 = true;
  }

  diableEdit()
  {
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
  }

  fixVariable(form: NgForm, value: string): void
  {
    Object.defineProperty(this.user, value, {
      value: form.value[value],
      writable: true 
    });
  }

  isUserChange(): boolean
  {
    return JSON.stringify(this.user) !== JSON.stringify(this.userService.getCurrentLoginUser());
  }

  checkPasswordStrength(form: NgForm)
  {
    let password = form.value.new_password;

    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if(strongRegex.test(password)) {
      this.passwordStrength = "Very Strong";
    } else if(mediumRegex.test(password)) {
      this.passwordStrength = "Strong";
    } else {
      this.passwordStrength = "Bad";
    }
  }

  changePassword(form: NgForm): void
  {
    let tempUser = structuredClone(this.userService.getCurrentLoginUser());
    let password = sha256(form.value.current_password);
    this.changePasswordError = '';
    
    if(password !== tempUser.password)
    {
      this.changePasswordError = 'current password is not correct';
      return;
    }

    let newPassword = form.value.new_password;
    let reNewPassword = form.value.confirm_new_password;

    if(newPassword !== reNewPassword)
    {
      this.changePasswordError = "re-new password does not match new password";
      return;
    }

    tempUser.password = newPassword;

    this.userService.modifyCurrentLoginUser(tempUser)
    .subscribe(
      res => {this.display5 = false, form.value.current_password = ''; form.value.new_password = ''; form.value.confirm_new_password = ''},
      err =>  this.changePasswordError = "Sorry we encounter some technicle difficulty at the moment, please try again latter"
    );
  }

}
