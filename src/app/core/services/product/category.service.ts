import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {HttpService} from 'src/app/core/services/http/http.service';
import {
  Category,
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

  getAllCategoriesWithProducts() {
    this.httpService.getAllProducts().subscribe((response: ProductsResponse) => {
      let productsByCategories: CategoryWithProducts = {};

      for (let i = 0; i < response.products.length; i++) {
        let product = response.products[i];

        productsByCategories[product.category] = [];
        productsByCategories[product.category].push(product);
      }

      this.productsByCategories.next(productsByCategories);
    });
  }

  getAllCategoriesToComponent(): Observable<CategoryResponse> {
    return this.httpService.getAllCategories();
  }

}
