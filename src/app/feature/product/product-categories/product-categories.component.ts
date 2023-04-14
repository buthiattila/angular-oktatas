import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";

import {CategoryResponse} from "../../../core/types/blog/category.type";
import {CategoryService} from "../../../core/services/blog/category.service";

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

  categories$: Observable<CategoryResponse> = new Subject();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.categories$ = this.categoryService.getAllCategoriesToComponent();
  }
}
