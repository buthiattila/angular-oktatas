import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';

  constructor(private router: Router){}

  navigateToHome():void{
    this.router.navigate(['home']);
  }
  navigateToLogin():void{
    this.router.navigate(['login']);
  }
}
