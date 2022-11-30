import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningStepperComponent } from './planning-stepper.component';

describe('PlanningStepperComponent', () => {
  let component: PlanningStepperComponent;
  let fixture: ComponentFixture<PlanningStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanningStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanningStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
