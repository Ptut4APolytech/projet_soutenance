import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login-first',
  templateUrl: './login-first.component.html',
  styleUrls: ['./login-first.component.scss']
})
export class LoginFirstComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });

  submit() {
    console.log("first login form submitted");
  }
}
