import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanningStepperComponent } from './planning/planning-stepper/planning-stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { ResetPasswordViewComponent } from './login/reset-password-view/reset-password-view.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-adapter/custom-date-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PlanningMembersPreviewComponent } from './planning/planning-members-preview/planning-members-preview.component';
import { LoginFirstComponent } from './login/login-first/login-first.component';
import { AdminOverviewComponent } from './admin/admin-overview/admin-overview.component';
import { AdminComponent } from './admin/admin.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConstraintsViewComponent } from './constraints/constraints-view/constraints-view.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageViewComponent } from './home-page/home-page-view/home-page-view.component';
import { NoPlanningComponent } from './home-page/no-planning/no-planning.component';
import { PlanningViewComponent } from './home-page/planning-view/planning-view.component';
import { PlanningTableComponent } from './home-page/planning-table/planning-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    ResetPasswordViewComponent,
    LoginFormComponent,
    PlanningViewComponent,
    PlanningStepperComponent,
    PlanningStepperComponent,
    LoginFirstComponent,
    HeaderComponent,
    FooterComponent,
    PlanningMembersPreviewComponent,
    AdminComponent,
    AdminOverviewComponent,
    ConstraintsViewComponent,
    HomepageViewComponent,
    NoPlanningComponent,
    PlanningViewComponent,
    PlanningTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatMenuModule,
    MatCheckboxModule,
    MatChipsModule,
    FormsModule,
    MatChipsModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatExpansionModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
