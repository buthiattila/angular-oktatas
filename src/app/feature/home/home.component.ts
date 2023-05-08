import { Component, OnDestroy, OnInit } from '@angular/core';

import {ImageSliderService} from "../../shared/image-slider/image-slider.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  test_text:string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

  constructor(public readonly slideService: ImageSliderService) {
  }

  ngOnInit(): void {
    console.log("HOME INIT");
  }

  ngOnDestroy(): void {
    console.log("HOME DESTORY");
  }

  selectedIndex: number | null = null;

  getSelectedSlide(selectedIndex: number): void {
    this.selectedIndex = selectedIndex;
  }

}
