import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressLookupPageComponent } from './address-lookup-page.component';
import { Router, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ApiAddressLookupService } from '../../core/services/api/address-lookup-service';
import { AddressResultDouble } from '../../core/testing/doubles/api/address-result.double';
import { of } from 'rxjs';

describe('AddressLookupPageComponent', () => {
  let component: AddressLookupPageComponent;
  let fixture: ComponentFixture<AddressLookupPageComponent>;
  let router: Router;
  let mockApiAddressLookupService: ApiAddressLookupService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddressLookupPageComponent,
        RouterModule.forRoot([]),
        StoreModule.forRoot(),
      ],
      providers: [provideHttpClient()],
    }).compileComponents();

    mockApiAddressLookupService = TestBed.inject(ApiAddressLookupService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AddressLookupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should error when postcode is empty', () => {
    component.addressLookupForm.get('postcode')?.setValue('');
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const postcodeInput =
      fixture.debugElement.nativeElement.querySelector('#postcode');
    const errorMessage =
      fixture.debugElement.nativeElement.querySelector('#postcode-error');

    btn.click();
    fixture.detectChanges();

    expect(component.addressLookupForm.valid).toBe(false);
    expect(postcodeInput).toHaveClass('govuk-input--error');
    expect(errorMessage.style.display).toBe('block');
  });

  it('should error when addressLineOne is empty', () => {
    component.addressLookupForm.get('line1')?.setValue('');
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const postcodeInput =
      fixture.debugElement.nativeElement.querySelector('#searchString');
    const errorMessage =
      fixture.debugElement.nativeElement.querySelector('#line1-error');

    btn.click();
    fixture.detectChanges();

    expect(component.addressLookupForm.valid).toBe(false);
    expect(postcodeInput).toHaveClass('govuk-input--error');
    expect(errorMessage.style.display).toBe('block');
  });

  it('should route to chooseAddressPage when form is valid and there is more than one address', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    component.addressLookupForm.get('postcode')?.setValue('testPostcode');
    component.addressLookupForm.get('line1')?.setValue('testAddressLineOne');
    fixture.detectChanges();

    btn.click();

    expect(component.addressLookupForm.valid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['chooseAddress']);
  });

  it('should redurect to confirmAddress page when form is valid, continue button is clicked and there is only 1 address', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(mockApiAddressLookupService, 'get').and.returnValue(
      of(AddressResultDouble.prepareSuccessfulResultOneAddress())
    );
    const spy = spyOn(router, 'navigate');
    component.addressLookupForm.get('postcode')?.setValue('testPostcode');
    component.addressLookupForm.get('line1')?.setValue('testAddressLineOne');
    fixture.detectChanges();

    btn.click();

    expect(component.addressLookupForm.valid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['confirmAddress']);
  });
});
