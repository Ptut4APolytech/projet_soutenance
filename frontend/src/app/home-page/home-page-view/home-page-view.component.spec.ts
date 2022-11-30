import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageViewComponent } from './home-page-view.component';

describe('HomepageViewComponent', () => {
  let component: HomepageViewComponent;
  let fixture: ComponentFixture<HomepageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
