import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddressPageComponent } from './confirm-address-page.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAddress } from '../../core/state/store/reducers/personalDetails.reducer';
import { Address } from '../../core/interfaces/PersonalDetails.interface';
import { AddressResultDouble } from '../../core/testing/doubles/api/address-result.double';

describe('ConfirmAddressPageComponent', () => {
  let component: ConfirmAddressPageComponent;
  let fixture: ComponentFixture<ConfirmAddressPageComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let store: MockStore;
  let mockAddressSelector: MemoizedSelector<Address, Address | null>;
  let mockAddress: Address[];

  beforeEach(async () => {
    mockAddress = AddressResultDouble.prepareSuccessfulResultOneAddress();

    await TestBed.configureTestingModule({
      imports: [
        ConfirmAddressPageComponent,
        RouterModule.forRoot([]),
        StoreModule.forRoot(),
      ],
      providers: [provideMockStore({})],
    }).compileComponents();

    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    store = TestBed.inject(MockStore);
    mockAddressSelector = store.overrideSelector(selectAddress, {
      ...mockAddress[0],
    });

    fixture = TestBed.createComponent(ConfirmAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should route to [checkAnswers] page when [Use this address] button is clicked', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    btn.click();

    expect(spy).toHaveBeenCalledWith(['checkAnswers']);
  });

  it('back link should have "/chooseAddress" link when route contains "choose-address"', () => {
    TestBed.inject(ActivatedRoute).snapshot.queryParams = {
      route: 'choose-address',
    };
    component.ngOnInit();
    fixture.detectChanges();
    const backLink =
      fixture.debugElement.nativeElement.querySelector('.govuk-back-link');
    const backLinkHref = backLink.getAttribute('href');

    expect(backLinkHref).toEqual('/chooseAddress');
  });

  it('back link should have "/enterAddressManually" link when route contains "enter-manually"', () => {
    TestBed.inject(ActivatedRoute).snapshot.queryParams = {
      route: 'enter-manually',
    };
    component.ngOnInit();
    fixture.detectChanges();
    const backLink =
      fixture.debugElement.nativeElement.querySelector('.govuk-back-link');
    const backLinkHref = backLink.getAttribute('href');

    expect(backLinkHref).toEqual('/enterAddressManually');
  });

  it('should load address info on page when it is present in store', () => {
    const addressText =
      fixture.debugElement.nativeElement.querySelector('.govuk-inset-text');

    expect(addressText.textContent).toContain(mockAddress[0].line1);
    expect(addressText.textContent).toContain(mockAddress[0].line2);
    expect(addressText.textContent).toContain(mockAddress[0].city);
    expect(addressText.textContent).toContain(mockAddress[0].province);
    expect(addressText.textContent).toContain(mockAddress[0].postcode);
  });
});
