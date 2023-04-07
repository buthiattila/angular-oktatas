import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginApi, LoginResponse } from '../../types/api/login-api.type';
import { LoginAuth } from '../../types/auth/login-auth.type';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isCompany: boolean = false;
  constructor(private httpSerivce: HttpService) { }

  login(loginData:LoginAuth):Observable<LoginResponse>{
    this.isCompany = loginData.login_isCompany;
    return this.httpSerivce.postLogin(this.mapLoginDataToLoginApiData(loginData))
  }

  initUser(userData:LoginResponse):void{
    localStorage.setItem("token", userData.token);
  }

  isLoggedIn():string | null{
   return localStorage.getItem("token");
  }

  private mapLoginDataToLoginApiData(loginData:LoginAuth): LoginApi{
    return {
      username:loginData.login_username,
      password: loginData.login_password
    }
  }
}
