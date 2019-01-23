import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'Bartendr';
}

  /*
  constructor(
    private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }


   Delete JWT Token when closing browser or browser windows
  So, in the ngOnInit of my app.component.ts, I added an event listener for beforeunload to the window
   and I call a function which calls the logout function.

   Tryed to implment logout on WindowClose, however 'beforeundload', logs us out on every reload.

  ngOnInit() {
    const context = this;
    window.addEventListener('beforeunload', function (e) {
      context.logoutOnClose();
    });
  }

  logoutOnClose() {
    this.authService.logout();
  }
}
*/
