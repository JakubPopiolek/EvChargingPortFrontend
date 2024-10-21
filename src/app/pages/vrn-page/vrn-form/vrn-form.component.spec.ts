import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrnFormComponent } from './vrn-form.component';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('VrnFormComponent', () => {
  let component: VrnFormComponent;
  let fixture: ComponentFixture<VrnFormComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrnFormComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(VrnFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error when vrn input is empty', () => {
    component.vrn.setValue('');
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const inputBox =
      fixture.debugElement.nativeElement.querySelector('.govuk-input');
    const errorMessage = fixture.debugElement.nativeElement.querySelector(
      '.govuk-error-message'
    );

    btn.click();
    fixture.detectChanges();

    expect(component.isValid).toBe(false);
    expect(inputBox).toHaveClass('govuk-input--error');
    expect(errorMessage.style.display).toBe('block');
  });

  it('should route to confirm vehicle details when vrn is valid and continue button clicked', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    component.vrn.setValue('test');
    fixture.detectChanges();

    btn.click();

    expect(component.isValid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['/confirmVehicleDetails']);
  });
});
