import { Component  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoginResponse } from 'src/app/core/types/api/login-api.type';
import { LoginAuth } from 'src/app/core/types/auth/login-auth.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent   {


  loginForm: FormGroup;

  constructor(private authSerivce: AuthService, private router: Router){
    this.loginForm = new FormGroup({

      login_username: new FormControl("kminchelle",[Validators.required]),
      login_password: new FormControl("0lelplR",[Validators.required]),
      login_isCompany: new FormControl(null)

    });
  }

  login(){
    if(this.loginForm.valid){
      const formData: LoginAuth = this.loginForm.value;
      this.authSerivce.login(formData).subscribe((res:LoginResponse)=>{
        if(res.id){
          this.authSerivce.initUser(res);
          this.router.navigate(['posts']);
        }else{
          alert("HIBA!");
        }
      });
    }
  }


}
