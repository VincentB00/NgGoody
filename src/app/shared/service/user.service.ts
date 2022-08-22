import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../model/Response.model';
import { User } from '../model/User.model';
import { AuthService } from './auth.service';

const headers= new HttpHeaders()
  .set('content-type', 'application/json');



@Injectable({
  providedIn: 'root'
})
export class UserService
{
  rolesStack = {
    'login': () => this.isLogin(),
    'admin': () => this.isAdmin(),
    'owner': () => this.isOwner()
  };
  


  constructor(
    private httpClient: HttpClient, 
    private authService: AuthService,
    private router: Router
    ) { }



  isAdminOrOwner(): boolean
  {
    return this.isAdmin() || this.isOwner();
  }

  isAdmin(): boolean
  {
    return this.getCurrentLoginUser().userRoles.some((r) => r.type.toLowerCase() === "admin");
  }

  isOwner(): boolean
  {
    return this.getCurrentLoginUser().userRoles.some((r) => r.type.toLowerCase() === "owner");
  }

  isLogin(): boolean
  {
    return this.authService.isLogin();
  }

  autoCheckAllUserRoles(roles: string[], redirect: string[]): void
  {
    roles.forEach((role) => {
      for (const [key, value] of Object.entries(this.rolesStack)) 
      {
        let isAcceptRole = value();
        if(key === role && !isAcceptRole)
          this.router.navigate(redirect);
      }
    })
  }

  autoCheckAnyUserRoles(roles: string[], redirect: string[]): void
  {
    let found = false;
    roles.forEach((role) => {
      if(found)
        return;
      for (const [key, value] of Object.entries(this.rolesStack)) 
      {
        let isAcceptRole = value();
        if(key === role && isAcceptRole)
        {
          found = true;
          break;
        }
      }
    })

    if(!found)
      this.router.navigate(redirect);
  }

  getCurrentLoginUser(): User
  {
    return this.authService.getUser();
  }

  getCopyOfCurrentLoginUser(): User
  {
    return structuredClone(this.authService.getUser());
  }

  updateUser(): User
  {
    this.authService.updateUser();
    return this.getCurrentLoginUser();
  }
  
  isValidUsername(username: string): Observable<Response>
  {
    return this.httpClient.get<Response>(`${environment.api}/users/${username}`);
  }

  registerUser(user: User): Observable<Response>
  {
    return this.httpClient.post<Response>(`${environment.api}/users`, JSON.stringify(user));
  }

  modifyCurrentLoginUser(user: User): Observable<Response>
  {
    delete user.create_time;
    return this.httpClient.put<Response>(`${environment.api}/users`, JSON.stringify(user), {withCredentials: true});
  }
}
