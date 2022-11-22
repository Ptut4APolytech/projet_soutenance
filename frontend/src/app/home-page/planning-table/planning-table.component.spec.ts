import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningTableComponent } from './planning-table.component';

describe('PlanningTableComponent', () => {
  let component: PlanningTableComponent;
  let fixture: ComponentFixture<PlanningTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
