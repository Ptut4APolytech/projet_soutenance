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
import { HomepageViewComponent } from './home-page/home-page-view/home-page-view.component';
import { NoPlanningComponent } from './home-page/no-planning/no-planning.component';
import { PlanningViewComponent } from './home-page/planning-view/planning-view.component';
import { PlanningTableComponent } from './home-page/planning-table/planning-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    ResetPasswordViewComponent,
    LoginFormComponent,
    HomepageViewComponent,
    NoPlanningComponent,
    PlanningViewComponent,
    PlanningTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
