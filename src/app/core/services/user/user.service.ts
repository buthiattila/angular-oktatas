import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  getUser(userId: number): Promise<any> {
    return new Promise(function (resolve, reject) {
      // ez lenne a backend
      setTimeout(function () {
        resolve({
          userId: userId,
          name: 'Peter'
        });
      }, 2000);
    });
  }

}
