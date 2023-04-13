import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {LoginAuth, LoginApi, LoginResponse} from 'src/app/core/types/account/login.type';
import {HttpService} from '../http/http.service';
import {RegistrationApi, RegistrationAuth, RegistrationResponse} from "../../types/account/registration.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpSerivce: HttpService) {
  }

  registration(regData: RegistrationAuth): Observable<RegistrationResponse> {
    return this.httpSerivce.postRegistration(this.mapRegDataToRegistrationApiData(regData))
  }

  private mapRegDataToRegistrationApiData(regData: RegistrationAuth): RegistrationApi {
    return {
      firstName: regData.firstName,
      lastName: regData.lastName,
      age: regData.age
    }
  }

  login(loginData: LoginAuth): Observable<LoginResponse> {
    return this.httpSerivce.postLogin(this.mapLoginDataToLoginApiData(loginData))
  }

  private mapLoginDataToLoginApiData(loginData: LoginAuth): LoginApi {
    return {
      username: loginData.username,
      password: loginData.password
    }
  }

  initUser(userData: LoginResponse): void {
    localStorage.setItem("token", userData.token);
  }

  isLoggedIn(): string | null {
    return localStorage.getItem("token");
  }

  logout(): void {
    localStorage.removeItem("token");
  }

}
