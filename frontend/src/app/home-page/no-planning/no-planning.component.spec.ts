import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPlanningComponent } from './no-planning.component';

describe('NoPlanningComponent', () => {
  let component: NoPlanningComponent;
  let fixture: ComponentFixture<NoPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
