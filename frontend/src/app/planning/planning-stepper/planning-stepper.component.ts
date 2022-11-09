import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
@Component({
  selector: 'app-planning-stepper',
  templateUrl: './planning-stepper.component.html',
  styleUrls: ['./planning-stepper.component.scss'],
})
export class PlanningStepperComponent {
  generalInformations = this._formBuilder.group({
    generalInformationsCtrl: ['', Validators.required],
  });
  timeSchedule = this._formBuilder.group({
    dateTimePicker: ['', Validators.required],
  });
  startTimePeriod: string | null = null;
  endTimePeriod: string | null = null;
  chipList: string[] = [];

  addChip() {
    this.chipList?.push(this.startTimePeriod + ' - ' + this.endTimePeriod);
    console.log(this.startTimePeriod, this.endTimePeriod);
  }

  constructor(private _formBuilder: FormBuilder) {}
}
