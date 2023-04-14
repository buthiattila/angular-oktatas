import {Component, OnInit} from '@angular/core';

import {CategoryService} from "../../../core/services/product/category.service";
import {Observable, Subject} from "rxjs";
import {CategoryResponse} from "../../../core/types/product/category.type";

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit {

  categories$: Observable<CategoryResponse> = new Subject();

  constructor(public readonly categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.categories$ = this.categoryService.getAllCategoriesToComponent();
  }

}
