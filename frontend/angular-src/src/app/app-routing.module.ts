import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginViewComponent} from "./login/login-view/login-view.component";
import {ResetPasswordViewComponent} from "./login/reset-password-view/reset-password-view.component";

const routes: Routes = [
  {path:"", component:LoginViewComponent},
  {path:"reset-password", component:ResetPasswordViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
