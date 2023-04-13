import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {AuthService} from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  title: string = '';

  constructor(private router: Router, private titleService: Title, private authService: AuthService) {
    this.title = this.titleService.getTitle();
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
