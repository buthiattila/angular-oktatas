import { Component, OnDestroy, OnInit } from '@angular/core';

import {ImageSliderService} from "../../shared/image-slider/image-slider.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  value = 'Clear me';

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
