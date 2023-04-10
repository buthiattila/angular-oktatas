import {Injectable} from '@angular/core';

import {ImageSlide} from "./image-slider.type";

@Injectable({
  providedIn: 'root'
})
export class ImageSliderService {

  private currentIndex: number = 0;
  private triggerIndex: number = 0;
  private maxIndex: number = 0;
  private minIndex: number = 0;
  private slides: ImageSlide[] = [
    {
      'title': 'kép 1',
      'url': 'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg',
      'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a tristique libero, et tincidunt nisi. Donec eu rhoncus lectus. Proin quis dapibus ante. Curabitur at ultrices justo.',
    },
    {
      'title': 'kép 2',
      'url': 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg',
      'desc': 'In tincidunt neque vel velit pharetra auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ',
    },
    {
      'title': 'kép 3',
      'url': 'https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-thumb.jpg',
      'desc': 'ellentesque quam urna, ultrices eget libero quis, feugiat lacinia erat. Praesent consectetur, diam id aliquam placerat, lectus massa convallis sem, cursus dapibus risus ligula sit amet nisi.',
    },
    {
      'title': 'kép 4',
      'url': 'https://images3.alphacoders.com/130/thumbbig-1301279.jpg',
      'desc': 'Sed maximus diam diam, a euismod mi molestie nec. Nullam et tortor eget elit sollicitudin hendrerit non id tellus.',
    },
    {
      'title': 'kép 5',
      'url': 'https://img.freepik.com/free-photo/galaxy-nature-aesthetic-background-starry-sky-mountain-remixed-media_53876-126761.jpg',
      'desc': 'Aliquam iaculis elementum elit, id pharetra sem mollis et. Vivamus venenatis eu turpis eu luctus. Praesent non consequat ligula.',
    }
  ];

  constructor() {
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  setCurrentIndex(newIndex: number): void {
    this.currentIndex = newIndex;
  }

  getTriggerIndex(): number {
    return this.triggerIndex;
  }

  setTriggerIndex(newIndex: number): void {
    this.triggerIndex = newIndex;
  }

  getSlides(): ImageSlide[] {
    return this.slides;
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
    this.setCurrentIndex(targetIndex);
  }

}
