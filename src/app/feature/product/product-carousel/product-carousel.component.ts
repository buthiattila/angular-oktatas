import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";

import {CategoryService} from "../../../core/services/product/category.service";
import {CategoryResponse, CategoryWithProducts,} from "../../../core/types/product/category.type";

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit {

  categories$: Observable<CategoryResponse> = new Subject();
  productsByCategories$: Observable<CategoryWithProducts> = new Subject();

  constructor(public readonly categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.categories$ = this.categoryService.getAllCategoriesToComponent();
    this.categoryService.getAllCategoriesWithProducts();

    this.categoryService.productsByCategories$;
  }

}
