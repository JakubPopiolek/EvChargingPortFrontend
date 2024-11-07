import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAddressPageComponent } from './choose-address-page.component';
import { Action, MemoizedSelector, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ApiAddressLookupService } from '../../core/services/api/address-lookup-service';
import { ApiAddressLookupServiceStubFactory } from '../../core/testing/mocks/api/address-lookup-service-stub.factory';
import { Address } from '../../core/interfaces/PersonalDetails.interface';
import { selectAddress } from '../../core/state/store/reducers/personalDetails.reducer';
import { AddressResultDouble } from '../../core/testing/doubles/api/address-result.double';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';

describe('ChooseAddressPageComponent', () => {
  let component: ChooseAddressPageComponent;
  let fixture: ComponentFixture<ChooseAddressPageComponent>;
  let store: MockStore;
  let addressLookupServiceMock: ApiAddressLookupService;
  let addressSelectorMock: MemoizedSelector<Address, Address | null>;
  let addressesMock: Address[];
  let actions$ = new Observable<Action>();
  let router: Router;

  beforeEach(async () => {
    addressLookupServiceMock =
      ApiAddressLookupServiceStubFactory.prepareWithMethods(['get']);
    addressesMock = AddressResultDouble.prepareSuccessfulResultTwoAddresses();
    await TestBed.configureTestingModule({
      imports: [
        ChooseAddressPageComponent,
        StoreModule.forRoot(),
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        provideMockStore({}),
        provideMockActions(() => actions$),
        {
          provide: ApiAddressLookupService,
          useValue: addressLookupServiceMock,
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    addressSelectorMock = store.overrideSelector(
      selectAddress,
      addressesMock[0],
    );
    router = TestBed.inject(Router);
    // addressLookupServiceMock = TestBed.inject(ApiAddressLookupService)

    fixture = TestBed.createComponent(ChooseAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load addresses from api when page loads', () => {
    spyOn(addressLookupServiceMock, 'get').and.returnValue(of(addressesMock));
    component.ngOnInit();
    fixture.detectChanges();
    const addresses = fixture.debugElement.queryAll(
      By.css('input[type=radio]'),
    );

    expect(addresses).toBeTruthy();
    expect(addresses.length).toBe(addressesMock.length);
  });

  it('should show errors when continue is clicked with no address selected', () => {
    const btn = fixture.debugElement.query(
      By.css('.govuk-button'),
    ).nativeElement;
    const errorMessage = fixture.debugElement.nativeElement.querySelector(
      '.govuk-error-message',
    );
    const errorBar =
      fixture.debugElement.nativeElement.querySelector('#choose-address');

    btn.click();
    fixture.detectChanges();

    expect(errorMessage.style.display).toBe('block');
    expect(errorBar).toBeTruthy();
  });

  it('should dispatch save address action and navigate to confirmAddress when form is valid', () => {
    spyOn(addressLookupServiceMock, 'get').and.returnValue(of(addressesMock));
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    const navigationSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    fixture.detectChanges();
    const addresses = fixture.debugElement.queryAll(
      By.css('input[type=radio]'),
    );
    addresses[0].nativeElement.click();
    fixture.detectChanges();

    const btn = fixture.debugElement.query(
      By.css('.govuk-button'),
    ).nativeElement;

    btn.click();

    expect(component.addressSelectionForm.valid).toBe(true);
    expect(storeSpy).toHaveBeenCalled();
    expect(navigationSpy).toHaveBeenCalledWith(['confirmAddress']);
  });
});
