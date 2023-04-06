import { Injectable } from '@angular/core';
import { LoginApi, LoginResponse } from '../../types/api/login-api.type';
import { RegistrationApi, RegistrationResponse } from '../../types/api/registration-api.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Post, PostResponse } from '../../types/post/post.type';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postLogin(dataToPost:LoginApi):Observable<LoginResponse> {
    return this.postRequest(environment.api.login, dataToPost);
  }

  postRegistration(dataToPost:RegistrationApi):Observable<RegistrationResponse>{
    return this.postRequest(environment.api.registration, dataToPost);
  }

  getAllPosts():Observable<PostResponse>{
    return this.getRequest(environment.api.posts);
  }

  getSinglePost(id:number):Observable<Post>{
    return this.getRequest(environment.api.post + id);
  }

  private getRequest(path:string): Observable<any>{
    return this.http.get(environment.api.apiBaseUrl+path);
  }

  private postRequest(path: string, dataToPost?:any):Observable<any>{
    return this.http.post(environment.api.apiBaseUrl + path, dataToPost);
  }


}
