import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../form/custom-form-validators';

@Component({
  selector: 'app-login-first',
  templateUrl: './login-first.component.html',
  styleUrls: ['./login-first.component.scss'],
})
export class LoginFirstComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  form: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=\\S+$).{8,}$'
        ),
      ]),
      passwordConfirm: new FormControl('', Validators.required),
    },
    [CustomFormValidators.matchValidator('password', 'passwordConfirm')]
  );

  submit() {}
}
