import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

import {RegistrationAuth, RegistrationResponse} from "src/app/core/types/account/registration.type";
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private authSerivce: AuthService, private router: Router) {
    this.regForm = new FormGroup({
      'firstName': new FormControl("Muhammad", [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl('Ovi', [Validators.required, Validators.minLength(3)]),
      'age': new FormControl(250, [Validators.required, Validators.pattern('^[0-9]+$')]),
    });
  }

  regForm: FormGroup;

  checkValue(formId: string): boolean {
    return this.regForm.controls[formId].invalid && (this.regForm.controls[formId].touched || this.regForm.controls[formId].dirty);
  }

  formSave(): void {
    if (this.regForm.valid) {
      const formData: RegistrationAuth = this.regForm.value;

      this.authSerivce.registration(formData).subscribe((res: RegistrationResponse) => {
        if (res.id) {
          this.router.navigate(['login']);
        } else {
          alert("A regisztráció nem sikerült!");
        }
      });
    } else {
      alert("Nem megfelelő adatkitöltés!");
    }
  }
}
