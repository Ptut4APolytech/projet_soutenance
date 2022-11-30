import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningMembersPreviewComponent } from './planning-members-preview.component';

describe('PlanningMembersPreviewComponent', () => {
  let component: PlanningMembersPreviewComponent;
  let fixture: ComponentFixture<PlanningMembersPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanningMembersPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanningMembersPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
