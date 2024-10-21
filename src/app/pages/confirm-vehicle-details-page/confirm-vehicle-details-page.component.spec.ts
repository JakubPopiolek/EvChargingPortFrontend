import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { vehicleDetailsState } from '../../core/state/store/reducers/api/vehicleEnquiryService.reducer';
import { getVehicleDetails } from '../../core/state/store/selectors/api/vehicleEnquiryService.selector';
import { ApiVehicleDetailsResponseDouble } from '../../core/testing/doubles/api/vehicle-details-result.double';
import { ConfirmVehicleDetailsPageComponent } from './confirm-vehicle-details-page.component';

describe('ConfirmVehicleDetailsPageComponent', () => {
  let component: ConfirmVehicleDetailsPageComponent;
  let fixture: ComponentFixture<ConfirmVehicleDetailsPageComponent>;
  let router: Router;
  let mockState: vehicleDetailsState;
  let store: MockStore;
  let mockVehicleDetailsSelector: MemoizedSelector<
    vehicleDetailsState,
    vehicleDetailsState
  >;

  mockState = {
    vehicleDetails:
      ApiVehicleDetailsResponseDouble.prepareSuccessfulResultElectric(),
    isLoading: false,
    isLoadingSuccess: true,
    isLoadingFailure: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmVehicleDetailsPageComponent, RouterModule.forRoot([])],
      providers: [provideMockStore({ initialState: mockState })],
    }).compileComponents();

    router = TestBed.inject(Router);

    store = TestBed.inject(MockStore);
    mockVehicleDetailsSelector = store.overrideSelector(
      getVehicleDetails,
      mockState
    );

    fixture = TestBed.createComponent(ConfirmVehicleDetailsPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error when radio button is not selected and not call router', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const errorMessage = fixture.debugElement.nativeElement.querySelector(
      '.govuk-error-message'
    );
    const spy = spyOn(router, 'navigate');

    btn.click();
    fixture.detectChanges();

    expect(component.isValid).toBe(false);
    expect(errorMessage.style.display).toBe('block');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should route to name page when continue button is clicked, yes is selected and vehicle is electric', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    component.confirmVehicleDetails.setValue('yes');
    fixture.detectChanges();

    btn.click();

    expect(component.isValid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['name']);
  });

  it('should route to not electric vehicle page when continue button is clicked, yes is selected and vehicle is not electric', () => {
    const petrolVehicleMock = {
      ...mockState,
      vehicleDetails: { ...mockState.vehicleDetails!, fuelType: 'petrol' },
    };
    mockVehicleDetailsSelector.setResult(petrolVehicleMock);
    store.refreshState();
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    component.confirmVehicleDetails.setValue('yes');
    fixture.detectChanges();

    btn.click();

    expect(component.isValid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['notElectricVehicle']);
  });

  it('should route to vrn when continue button is clicked and no is selected', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    component.confirmVehicleDetails.setValue('no');
    fixture.detectChanges();

    btn.click();

    expect(component.isValid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['vrn']);
  });
});
