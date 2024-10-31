import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrnFormComponent } from './vrn-form.component';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { VehicleDetails } from '../../../core/interfaces/VehicleDetails.interface';
import {
  selectVehicleDetails,
  selectVehicleDetailsState,
  VehicleDetailsState,
} from '../../../core/state/store/reducers/api/vehicleDetailsService.reducer';
import { ApiVehicleDetailsDouble } from '../../../core/testing/doubles/api/vehicle-details.double';

describe('VrnFormComponent', () => {
  let component: VrnFormComponent;
  let fixture: ComponentFixture<VrnFormComponent>;
  let router: Router;
  let mockVehicleDetailsSelector: MemoizedSelector<
    VehicleDetails,
    VehicleDetails | undefined
  >;
  let store: MockStore;
  const mockVehiceDetails =
    ApiVehicleDetailsDouble.prepareSuccessfulResultElectric();

  const mockVehicleDetailsState =
    ApiVehicleDetailsDouble.prepareVehicleDetailsState();

  let mockVehicleDetailsStateSelector: MemoizedSelector<
    VehicleDetailsState,
    VehicleDetailsState | undefined
  >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrnFormComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    mockVehicleDetailsSelector = store.overrideSelector(
      selectVehicleDetails,
      mockVehiceDetails
    );
    mockVehicleDetailsStateSelector = store.overrideSelector(
      selectVehicleDetailsState,
      { ...mockVehicleDetailsState, isLoadingSuccess: true }
    );
    fixture = TestBed.createComponent(VrnFormComponent);
    component = fixture.componentInstance;
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
    expect(errorMessage.innerText).toContain(
      'Enter vehicle registration number'
    );
  });

  it('should route to confirm vehicle details when vrn is valid and continue button clicked', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    component.vrn.setValue('test');
    fixture.detectChanges();

    btn.click();

    expect(component.isValid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['confirmVehicleDetails']);
  });

  it('should show error message when api call fails', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    mockVehicleDetailsStateSelector.setResult({
      ...mockVehicleDetailsState,
      isLoadingSuccess: false,
      isLoadingFailure: true,
    });
    store.refreshState();

    const errorMessage = fixture.debugElement.nativeElement.querySelector(
      '.govuk-error-message'
    );
    component.vrn.setValue('test');
    fixture.detectChanges();

    btn.click();
    fixture.detectChanges();

    expect(component.isValid).toBe(false);
    expect(errorMessage.innerText).toContain(
      'Vehicle not found. Enter a valid VRN'
    );
  });

  it('should fill vrn box when values are present in store', () => {
    const vrnInputBox =
      fixture.debugElement.nativeElement.querySelector('.govuk-input');

    expect(vrnInputBox.value).toBe(mockVehiceDetails.registrationNumber);
  });
});
