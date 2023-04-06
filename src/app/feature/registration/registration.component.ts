import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthService} from "../../core/services/auth/auth.service";
import {RegistrationResponse} from "../../core/types/api/registration-api.type";
import {RegistrationAuth} from "../../core/types/auth/registration-auth.type";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {

  registrationForm: FormGroup;

  constructor(private authSerivce: AuthService, private router: Router) {
    this.registrationForm = new FormGroup({

      registration_username: new FormControl("", [Validators.required]),
      registration_password: new FormControl("", [Validators.required]),
      registration_isCompany: new FormControl(null)

    });
  }

  registration() {
    if (this.registrationForm.valid) {
      const formData: RegistrationAuth = this.registrationForm.value;

      this.authSerivce.registration(formData).subscribe((res: RegistrationResponse) => {

        if (res.id) {
          this.authSerivce.initUser(res);
          this.router.navigate(['posts']);
        } else {
          alert("HIBA!");
        }

      });
    }
  }
}
