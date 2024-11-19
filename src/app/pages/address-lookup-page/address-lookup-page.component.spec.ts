import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressLookupPageComponent } from './address-lookup-page.component';
import { Router, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { ApiAddressLookupService } from '../../core/services/api/address-lookup-service';
import { AddressResultDouble } from '../../core/testing/doubles/api/address-result.double';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Address } from '../../core/interfaces/PersonalDetails.interface';
import { selectAddress } from '../../core/state/store/reducers/personalDetails.reducer';

describe('AddressLookupPageComponent', () => {
  let component: AddressLookupPageComponent;
  let fixture: ComponentFixture<AddressLookupPageComponent>;
  let router: Router;
  let mockApiAddressLookupService: ApiAddressLookupService;
  let store: MockStore;
  let addressSelectorMock: MemoizedSelector<Address, Address | null>;
  let addressesMock: Address[];

  beforeEach(async () => {
    addressesMock = AddressResultDouble.prepareSuccessfulResultOneAddress();

    await TestBed.configureTestingModule({
      imports: [
        AddressLookupPageComponent,
        RouterModule.forRoot([]),
        StoreModule.forRoot(),
      ],
      providers: [provideHttpClient(), provideMockStore({})],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    addressSelectorMock = store.overrideSelector(
      selectAddress,
      addressesMock[0]
    );

    mockApiAddressLookupService = TestBed.inject(ApiAddressLookupService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AddressLookupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prefill input when address data is in store', () => {
    const postcodeInput =
      fixture.debugElement.nativeElement.querySelector('#postcode');
    const addressLineOneInput =
      fixture.debugElement.nativeElement.querySelector('#addressLineOne');

    expect(addressLineOneInput.value).toBe(addressesMock[0].line1);
    expect(postcodeInput.value).toBe(addressesMock[0].postcode);
  });

  it('should not prefill input when address data is not in store', () => {
    addressSelectorMock.setResult(null);
    store.refreshState();
    const postcodeInput =
      fixture.debugElement.nativeElement.querySelector('#postcode');
    const addressLineOneInput =
      fixture.debugElement.nativeElement.querySelector('#addressLineOne');

    expect(addressLineOneInput.value).toBe('');
    expect(postcodeInput.value).toBe('');
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
    const addressLineOneInput =
      fixture.debugElement.nativeElement.querySelector('#addressLineOne');
    const errorMessage =
      fixture.debugElement.nativeElement.querySelector('#line1-error');

    btn.click();
    fixture.detectChanges();

    expect(component.addressLookupForm.valid).toBe(false);
    expect(addressLineOneInput).toHaveClass('govuk-input--error');
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

  it('should redirect to confirmAddress page when form is valid, continue button is clicked and there is only 1 address', () => {
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

  it('should route to noAddressFound when form is valid and there are no addresses found', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    spyOn(mockApiAddressLookupService, 'get').and.returnValue(of([]));
    component.addressLookupForm.get('postcode')?.setValue('testPostcode');
    component.addressLookupForm.get('line1')?.setValue('testAddressLineOne');
    fixture.detectChanges();

    btn.click();

    expect(component.addressLookupForm.valid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['noAddressFound']);
  });
});
