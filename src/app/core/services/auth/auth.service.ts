import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {LoginAuth, LoginApi, LoginResponse} from 'src/app/core/types/account/login.type';
import {HttpService} from '../http/http.service';
import {RegistrationApi, RegistrationAuth, RegistrationResponse} from "../../types/account/registration.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authErrorCnt = new BehaviorSubject<number>(0);
  authErrorCnt$ = this.authErrorCnt.asObservable();

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private httpSerivce: HttpService) {
  }

  increaseErrorCnt(): void {
    let currentValue = this.authErrorCnt.value;

    this.authErrorCnt.next(++currentValue);
  }

  resetErrorCnt(): void {
    this.authErrorCnt.next(0);
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
    this.loggedIn.next(true);
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
    this.loggedIn.next(false);
    localStorage.removeItem("token");
  }

  checkLoggedIn(){
    if(this.isLoggedIn()){
      this.loggedIn.next(true);
    }else{
      this.loggedIn.next(false);
    }
  }

}
