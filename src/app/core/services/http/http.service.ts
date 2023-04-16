import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, catchError, throwError} from 'rxjs';

import {environment} from 'src/environments/environment';
import {RegistrationApi, RegistrationResponse} from "src/app/core/types/account/registration.type";
import {LoginApi, LoginResponse} from 'src/app/core/types/account/login.type';
import {Post, PostResponse} from 'src/app/core/types/blog/post.type';
import {
  Category,
  CategoryProductResponse,
  CategoryResponse,
  CategoryWithProducts,
  ProductsResponse
} from "../../types/product/category.type";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  postRegistration(dataToPost: RegistrationApi): Observable<RegistrationResponse> {
    return this.postRequest(environment.api.registration, dataToPost);
  }

  postLogin(dataToPost: LoginApi): Observable<LoginResponse> {
    return this.postRequest(environment.api.login, dataToPost);
  }

  getAllPosts(): Observable<PostResponse> {
    return this.getRequest(environment.api.posts);
  }

  getSinglePost(id: number): Observable<Post> {
    return this.getRequest(environment.api.post + id);
  }

  getAllProducts(): Observable<ProductsResponse> {
    return this.getRequest(environment.api.products);
  }

  getAllCategories(): Observable<CategoryResponse> {
    return this.getRequest(environment.api.categories);
  }

  getCategoryProducts(category: string): Observable<CategoryProductResponse> {
    return this.getRequest(environment.api.categoryProducts + category);
  }

  private getRequest(path: string): Observable<any> {
    return this.http.get(environment.api.apiBaseUrl + path).pipe(
      catchError((err) => {

        console.log("err captured in service");
        console.log(err);

        return throwError(() => "HIBA");
      })
    );
  }

  private postRequest(path: string, dataToPost?: any): Observable<any> {
    return this.http.post(environment.api.apiBaseUrl + path, dataToPost).pipe(
      catchError((err) => {

        console.log("err captured in service");
        console.log(err);

        return throwError(() => "HIBA");
      })
    );
  }

}
