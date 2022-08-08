import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getCurrentLoginUser(): User
  {
    return this.authService.getUser();
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
    return this.httpClient.post<Response>(`${environment.api}/users`, JSON.stringify(user), {'headers': headers});
  }

  modifyCurrentLoginUser(user: User): Observable<Response>
  {
    return this.httpClient.put<Response>(`${environment.api}/users`, JSON.stringify(user), {'headers': headers, withCredentials: true});
  }
}
