import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  regForm: FormGroup;

  constructor(private readonly http: HttpClient) {
    this.regForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'userName': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'vatNumber': new FormControl(null, [Validators.pattern(/^(\d{7})(\d)\-([1-5])\-(0[2-9]|[13][0-9]|2[02-9]|4[0-4]|51)$/)]),
      'age': new FormControl(null, [Validators.pattern(/^(\d)$/)]),
    });
  }

  checkValue(formId: string): boolean {
    return this.regForm.controls[formId].invalid && (this.regForm.controls[formId].touched || this.regForm.controls[formId].dirty);
  }

  formSave(): void {
    if (this.regForm.status !== 'INVALID') {
      console.log('ok');

      console.log(this.regForm.value);
      console.log(this.regForm.controls);

      this.http.post('https://dummyjson.com/users/add', this.regForm.value);

    } else {
      console.log('hibás');
    }
  }
}
