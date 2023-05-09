import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from '@angular/router';

import {AuthService} from "../../core/services/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  title: string = '';
  loggedIn: boolean = false;

  constructor(private titleService: Title, private router: Router, private authService: AuthService) {
    this.title = this.titleService.getTitle();
  }

  ngOnInit() {
    this.authService.checkLoggedIn();
    this.authService.loggedIn$.subscribe((res) => {
      this.loggedIn = res;
    })
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['home']);
  }

}
