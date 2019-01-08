import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn = false;
  loggedInChange: Subject<boolean> = new Subject<boolean>();
  jwtHelperService: JwtHelperService;
  isAdmin: boolean;

  accessTokenLocalStorageKey = 'access_token';

  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelperService = new JwtHelperService();
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: '
        + this.jwtHelperService.getTokenExpirationDate(token));
      this.isLoggedIn = !this.jwtHelperService.isTokenExpired(token);
    }
    this.loggedInChange.subscribe((value) => {
      this.isLoggedIn = value;
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
      const helper = new JwtHelperService();
      const infos = helper.decodeToken(token);
      this.isAdmin = infos.authorities.filter((o) => o === 'ROLE_ADMIN').length > 0;
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

  getAll() {
    return this.http.get('/api/users');
  }

  getById(id: String) {
    return this.http.get('/api/users/' + id);
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.id, user);
  }

}
