import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User.model';
import { Response } from '../model/Response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const header = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{

  private user: User | undefined | null;

  constructor(private httpClient: HttpClient, private router: Router, private cookieService: CookieService) { }

  updateUser()
  {
    this.httpClient.get<User>(`${environment.api}/users`,{withCredentials: true})
    .subscribe(
      res => {this.user = res}
    );
  }

  clearUser()
  {
    this.user = null;
    // this.cookieService.set('JSESSIONID', 'a', 0, '/', 'localhost', false);
    this.router.navigate(['/login']).catch();
  }

  getUser(): User
  {
    return this.user!;
  }

  isLogin(): boolean
  {
    return this.user !== undefined && this.user !== null;
  }

  login(user: {username: string, password: string}): Observable<Response>
  {
    const userFormData = new HttpParams()
      .append('username', user.username)
      .append('password', user.password);
    
    return this.httpClient.post<Response>(
      `${environment.api}/login`,
      userFormData,
      //for cookie session based. set cookie/carry cookie
      {withCredentials: true}
    )
  }

  logout(): Observable<Response>
  {
    return this.httpClient.post<Response>(
      `${environment.api}/logout`,
      //for cookie session based. set cookie/carry cookie
      {withCredentials: true}
    )
  }
}
