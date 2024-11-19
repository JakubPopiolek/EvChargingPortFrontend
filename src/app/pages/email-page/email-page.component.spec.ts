import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPageComponent } from './email-page.component';
import { StoreModule } from '@ngrx/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

describe('EmailPageComponent', () => {
  let component: EmailPageComponent;
  let fixture: ComponentFixture<EmailPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmailPageComponent,
        StoreModule.forRoot(),
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(EmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should error when email is empty', () => {
    component.email.setValue('');
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const emailInput =
      fixture.debugElement.nativeElement.querySelector('.govuk-input');
    const errorMessage = fixture.debugElement.nativeElement.querySelector(
      '.govuk-error-message'
    );

    btn.click();
    fixture.detectChanges();

    expect(component.email.valid).toBe(false);
    expect(emailInput).toHaveClass('govuk-input--error');
    expect(errorMessage.style.display).toBe('block');
    expect(errorMessage.innerText).toBe('Enter email address');
  });

  it('should error when email is invalid', () => {
    component.email.setValue('test');
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const emailInput =
      fixture.debugElement.nativeElement.querySelector('.govuk-input');
    const errorMessage = fixture.debugElement.nativeElement.querySelector(
      '.govuk-error-message'
    );

    btn.click();
    fixture.detectChanges();

    expect(component.email.valid).toBe(false);
    expect(emailInput).toHaveClass('govuk-input--error');
    expect(errorMessage.style.display).toBe('block');
    expect(errorMessage.innerText).toBe('Enter a valid email address');
  });

  it('should route to address lookup page when form is valid', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    component.email.setValue('test@email.com');
    fixture.detectChanges();

    btn.click();

    expect(component.email.valid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['addressLookup']);
  });

  it('should route to checkAnswers page when form is valid and route has change=true', () => {
    TestBed.inject(ActivatedRoute).snapshot.queryParams = {
      change: true,
    };
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    component.email.setValue('test@email.com');
    fixture.detectChanges();

    btn.click();

    expect(component.email.valid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['checkAnswers']);
  });
});
