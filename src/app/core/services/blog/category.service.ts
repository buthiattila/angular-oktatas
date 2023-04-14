import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {HttpService} from 'src/app/core/services/http/http.service';
import {Category, CategoryResponse} from 'src/app/core/types/blog/category.type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories = new BehaviorSubject<Category[] | null>(null);
  categories$ = this.categories.asObservable();

  constructor(private httpService: HttpService) {
  }

  getAllCategories(): void {
    this.httpService.getAllCategories().subscribe((response: CategoryResponse) => {
      this.categories.next(response);
    });
  }

  getAllCategoriesToComponent(): Observable<CategoryResponse> {
    return this.httpService.getAllCategories();
  }

  getCategoryProducts(category: string): Observable<Category> {
    return this.httpService.getCategoryProducts(category);
  }

}
