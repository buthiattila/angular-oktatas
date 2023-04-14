import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {RegistrationAuth, RegistrationResponse} from "src/app/core/types/account/registration.type";
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  loading = false;
  regForm: FormGroup;

  constructor(private authSerivce: AuthService, private router: Router) {
    this.regForm = new FormGroup({
      'firstName': new FormControl(environment.testData.registration.firstName, [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl(environment.testData.registration.lastName, [Validators.required, Validators.minLength(3)]),
      'age': new FormControl(environment.testData.registration.age, [Validators.required, Validators.pattern('^[0-9]+$')]),
    });
  }

  checkValue(formId: string): boolean {
    return this.regForm.controls[formId].invalid && (this.regForm.controls[formId].touched || this.regForm.controls[formId].dirty);
  }

  formSave(): void {
    this.loading = true;

    if (this.regForm.valid) {
      const formData: RegistrationAuth = this.regForm.value;

      this.authSerivce.registration(formData).subscribe((res: RegistrationResponse) => {
        if (res.id) {
          this.router.navigate(['account/login']);
        } else {
          this.loading = false;
          alert("A regisztráció nem sikerült!");
        }
      });
    } else {
      this.loading = false;
      alert("Nem megfelelő adatkitöltés!");
    }
  }
}
