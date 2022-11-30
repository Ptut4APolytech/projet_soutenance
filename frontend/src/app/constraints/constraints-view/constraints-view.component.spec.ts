import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintsViewComponent } from './constraints-view.component';

describe('ConstraintsViewComponent', () => {
  let component: ConstraintsViewComponent;
  let fixture: ComponentFixture<ConstraintsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConstraintsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstraintsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
