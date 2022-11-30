import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { ResetPasswordViewComponent } from './login/reset-password-view/reset-password-view.component';
import { LoginFirstComponent } from './login/login-first/login-first.component';
import { AdminComponent } from './admin/admin.component';
import { HomepageViewComponent } from './home-page/home-page-view/home-page-view.component';

const routes: Routes = [
  { path: '', component: HomepageViewComponent },
  { path: 'first-login', component: LoginFirstComponent },
  { path: 'reset-password', component: ResetPasswordViewComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
