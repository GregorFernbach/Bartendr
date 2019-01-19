import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';
import {AuthService} from '../service/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.checkForJWTExpiration()) {
      this.authService.logout();
      this.toastr.info('Warning: You have been automatically logged out!', 'Authentication expired!');
    } else if (!this.authService.isLoggedIn) {
      this.authService.logout();
      this.toastr.info('Warning: You have been automatically logged out!', 'Authentication expired!');
    } else if (!this.authService.isAdmin) {
      this.toastr.error('You are not authorized!', 'Not authorized!');
      return false;
    } else {
      return true;
    }
  }
}
