import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";

import {CategoryService} from "../../../core/services/product/category.service";
import {
  CategoryProductResponse,
  CategoryResponse,
  CategoryWithProducts
} from "../../../core/types/product/category.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit {

  showTooltipId: string = '';
  loading: boolean = false;
  errorMsg: string = '';
  categories$: Observable<CategoryResponse> = new Subject();
  categoryWithProducts: CategoryWithProducts = {};
  private unsubscribe = new Subject<void>();

  constructor(public readonly categoryService: CategoryService, private element: ElementRef) {
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  showImageTitle(event: MouseEvent, imageId: string): void {
    this.showTooltipId = imageId;
  }

  hideImageTitle(imageId: string): void {
    this.showTooltipId = "";
  }

  private init(): void {
    this.loading = true;

    this.categoryService.getAllCategoriesToComponent().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (catResponse: CategoryResponse) => {
        for (let i = 0; i < catResponse.length; i++) {
          this.categoryService.getCategoryProducts(catResponse[i]).pipe(takeUntil(this.unsubscribe)).subscribe({
            next: (catProdResponse: CategoryProductResponse) => {
              this.loading = false;
              this.categoryWithProducts[catResponse[i]] = catProdResponse.products;
            },
            error: (err: HttpErrorResponse) => {
              this.loading = false;
              this.errorMsg = err.message;
            }
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMsg = err.message;
      }
    });
  }

}
