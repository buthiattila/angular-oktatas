import {Component} from '@angular/core';
import {ImageSlide} from "./image-slider.type";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {

  slides:ImageSlide[] = [
    {
      'title':'valami',
      'url':'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg'
    },
    {
      'title':'valami',
      'url':'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg'
    },
    {
      'title':'valami',
      'url':'https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-thumb.jpg'
    },
    {
      'title':'valami',
      'url':'https://images3.alphacoders.com/130/thumbbig-1301279.jpg'
    },
    {
      'title':'valami',
      'url':'https://img.freepik.com/free-photo/galaxy-nature-aesthetic-background-starry-sky-mountain-remixed-media_53876-126761.jpg'
    }
  ];
  currentIndex: number = 0;
  minIndex: number = 0;
  maxIndex: number = (this.slides.length - 1);

  slidePrev(): void {
    if (this.currentIndex > this.minIndex) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.maxIndex;
    }
  }

  slideNext(): void {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = this.minIndex;
    }
  }

}
