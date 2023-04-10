import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ImageSlide} from "./shared/image-slider/image-slider.type";
import {ImageSliderService} from "./shared/image-slider/image-slider.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';

  constructor(private router: Router, public readonly slideService:ImageSliderService) {

  }

  navigateToHome(): void {
    this.router.navigate(['home']);
  }

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }

  selectedIndex: number | null = null;

  getSelectedSlide(selectedIndex: number): void {
    this.selectedIndex = selectedIndex;
  }

}
