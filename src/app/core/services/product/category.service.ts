import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, from} from 'rxjs';
import {groupBy, mergeMap, toArray} from 'rxjs/operators';

import {HttpService} from 'src/app/core/services/http/http.service';
import {
  Category, CategoryProductResponse,
  CategoryResponse,
  CategoryWithProducts,
  ProductsResponse
} from 'src/app/core/types/product/category.type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories = new BehaviorSubject<Category[] | null>(null);
  categories$ = this.categories.asObservable();

  private productsByCategories = new BehaviorSubject<CategoryWithProducts | null>(null);
  productsByCategories$ = this.productsByCategories.asObservable();

  constructor(private httpService: HttpService) {
  }

  getAllCategories(): void {
    this.httpService.getAllCategories().subscribe((response: CategoryResponse) => {
      this.categories.next(response);
    });
  }

  getCategoryProducts(category: string): Observable<CategoryProductResponse> {
    return this.httpService.getCategoryProducts(category);
  }

  getAllProductsToComponent(): Observable<ProductsResponse> {
    return this.httpService.getAllProducts();
  }

  getAllCategoriesToComponent(): Observable<CategoryResponse> {
    return this.httpService.getAllCategories();
  }

}
