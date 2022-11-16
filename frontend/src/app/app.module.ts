import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginViewComponent } from './login/login-view/login-view.component';
import { ResetPasswordViewComponent } from './login/reset-password-view/reset-password-view.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { MaterialModule } from "./material.module";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MatMenuModule} from "@angular/material/menu";
import { LoginFirstComponent } from './login/login-first/login-first.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    ResetPasswordViewComponent,
    LoginFormComponent,
    LoginFirstComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
