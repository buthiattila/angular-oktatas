import { Injectable } from '@angular/core';
import { LoginApi, LoginResponse } from '../../types/api/login-api.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Post, PostResponse } from '../../types/post/post.type';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postLogin(dataToPost:LoginApi):Observable<LoginResponse>{
    return this.postRequest(environment.api.login, dataToPost);
  }

  getAllPosts():Observable<PostResponse>{
    return this.getRequest(environment.api.posts).pipe(
      catchError((err)=>{

        console.log("err captured in GET ALL POST service");
        console.log(err);

      return throwError(() => "HIBA");
    })
    );
  }

  getSinglePost(id:number):Observable<Post>{
    return this.getRequest(environment.api.post + id);
  }

  private getRequest(path:string): Observable<any>{
    return this.http.get(environment.api.apiBaseUrl+path).pipe(
      catchError((err)=>{

          console.log("err captured in service");
          console.log(err);

        return throwError(() => "HIBA");
      })
    );
  }

  private postRequest(path: string, dataToPost?:any):Observable<any>{
    return this.http.post(environment.api.apiBaseUrl + path, dataToPost);
  }


}
