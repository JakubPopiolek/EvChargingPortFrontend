import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContentWrapperComponent } from './app-content-wrapper.component';

describe('AppContentWrapperComponent', () => {
  let component: AppContentWrapperComponent;
  let fixture: ComponentFixture<AppContentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppContentWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
