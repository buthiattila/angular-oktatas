import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';

import {ImageSlide} from "./image-slider.type";
import {ImageSliderService} from "./image-slider.service";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {

  @Output() slideSelected: EventEmitter<number> = new EventEmitter<number>();
  @Input() triggerIndex: number = 0;

  constructor(public readonly slideService: ImageSliderService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // csak akkor fusson, le ha nem első változáskor fut le (pl inicializálás)

    if (changes['triggerIndex'] && !changes['triggerIndex'].firstChange) {
      this.emitSlideIndex();
    }
  }

  slidePrev(): void {
    this.slideService.slidePrev();
  }

  slideNext(): void {
    this.slideService.slideNext();
  }

  slideTo(targetIndex: number): void {
    this.slideService.slideTo(targetIndex);
  }

  emitSlideIndex(targetIndex?: number): void {
    this.slideSelected.emit((targetIndex) ? targetIndex : this.slideService.getCurrentIndex());
  }

}
