import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../api/user';
import {UserService} from './user.service';
import {NavigationComponent} from '../components/navigation/navigation.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  loggedInChange: Subject<boolean> = new Subject<boolean>();
  jwtHelperService: JwtHelperService;
  isAdmin: boolean;
  userName: string;

  accessTokenLocalStorageKey = 'access_token';

  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelperService = new JwtHelperService();
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token && !this.jwtHelperService.isTokenExpired(token)) {
      console.log('Token expiration date: '
        + this.jwtHelperService.getTokenExpirationDate(token));
      this.isLoggedIn = true;
      const infos = this.jwtHelperService.decodeToken(token);
      if (infos.authorities.filter((o) => o === 'ROLE_ADMIN').length > 0) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      this.userName = infos.sub;
      console.log('Auth-Data: '
        + this.isLoggedIn + '/' + this.userName);
    }

    this.loggedInChange.subscribe((value) => {
      this.isLoggedIn = value;

      if (this.isLoggedIn === false) {
        this.userName = '';
        this.isAdmin = false;
      }
    });
  }
  login(user) {
    return this.http.post('/api/auth/', user, {
      'headers': new HttpHeaders({'Content-Type': 'application/json'}),
      'responseType': 'text',
      observe: 'response'
    }).pipe(map((res: any) => {
      const token = res.headers.get('Authorization').replace(/^Bearer /, '');
      localStorage.setItem(this.accessTokenLocalStorageKey, token);
      const infos = this.jwtHelperService.decodeToken(token);
      if (infos.authorities.filter((o) => o === 'ROLE_ADMIN').length > 0) {
        this.isAdmin = true; } else  {this.isAdmin = false; }
      this.userName = infos.sub;
      console.log(this.jwtHelperService.decodeToken(token));
      this.loggedInChange.next(true);
      this.router.navigate(['/drink-list']);
      return res;
    }));
  }

  logout() {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.loggedInChange.next(false);
    this.router.navigate(['/login']);
  }
}
