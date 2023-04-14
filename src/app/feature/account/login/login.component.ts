import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {environment} from 'src/environments/environment';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {LoginAuth,LoginResponse} from 'src/app/core/types/account/login.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hidePassword = true;
  loading = false;
  loginForm: FormGroup;

  constructor(private authSerivce: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(environment.testData.login.username, [Validators.required]),
      password: new FormControl(environment.testData.login.password, [Validators.required]),
      isCompany: new FormControl(environment.testData.login.isCompany)
    });
  }

  formSave():void {
    this.loading = true;

    if (this.loginForm.valid) {
      const formData: LoginAuth = this.loginForm.value;

      this.authSerivce.login(formData).subscribe((res: LoginResponse) => {
        if (res.id) {
          this.authSerivce.initUser(res);
          this.router.navigate(['blog/posts']);
        } else {
          this.loading = false;
          alert("A felhasználónév vagy jelszó nem megfelelő!");
        }
      });
    } else {
      this.loading = false;
      alert("Nem megfelelő adatkitöltés!");
    }
  }

}
