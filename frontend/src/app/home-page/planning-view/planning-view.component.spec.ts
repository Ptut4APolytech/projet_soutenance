import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningViewComponent } from './planning-view.component';

describe('PlanningViewComponent', () => {
  let component: PlanningViewComponent;
  let fixture: ComponentFixture<PlanningViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
