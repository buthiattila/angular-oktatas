import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageSlide} from "./image-slider.type";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {

  @Input() slides: ImageSlide[] = [];
  @Output() slideSelected: EventEmitter<number> = new EventEmitter<number>();
  @Input() shouldGetIndex: boolean = false;
  maxIndex: number = 0;
  minIndex: number = 0;
  currentIndex: number = 0;

  ngOnChanges() {
    console.log('változáskor fut le');
  }

  ngGoCheck() {
    console.log('check');
  }

  ngAfterContentInit() {
    console.log('after init');
  }

  ngAfterContentCheck() {
    console.log('after check');
  }

  ngOnInit() {
    console.log('inicializáláskor fut le');
  }

  ngAfterViewInit() {
    console.log('view inicializálás után fut le');
  }

  ngAfterViewChecked() {
    console.log('view ellenőrzés után fut le');
  }

  ngOnDestroy() {
    console.log('komponens törlődésekor fut le (pl elnavigáláskor)');
  }

  setMaxIndex(): void {
    if (this.maxIndex == 0) {
      this.maxIndex = this.slides.length - 1;
    }
  }

  slidePrev(): void {
    this.setMaxIndex();

    if (this.currentIndex > this.minIndex) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.maxIndex;
    }
  }

  slideNext(): void {
    this.setMaxIndex();

    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = this.minIndex;
    }
  }

  slideTo(targetIndex: number): void {
    this.currentIndex = targetIndex;
  }

  slideClicked(targetIndex: number): void {
    this.slideSelected.emit(targetIndex);
  }

}
