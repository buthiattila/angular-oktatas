import {Component} from '@angular/core';

import {ImageSliderService} from '../image-slider/image-slider.service';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss']
})
export class SelectButtonComponent {

  constructor(private readonly sliderService: ImageSliderService) {
  }

  slideSelect(): void {
    this.sliderService.setTriggerIndex(Math.random());
  }

}
