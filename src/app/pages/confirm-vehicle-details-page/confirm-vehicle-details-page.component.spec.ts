import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ConfirmVehicleDetailsPageComponent } from './confirm-vehicle-details-page.component';
import {
  selectVehicleDetailsState,
  VehicleDetailsState,
} from '../../core/state/store/reducers/api/vehicleDetailsService.reducer';
import { ApiVehicleDetailsDouble } from '../../core/testing/doubles/api/vehicle-details.double';

describe('ConfirmVehicleDetailsPageComponent', () => {
  let component: ConfirmVehicleDetailsPageComponent;
  let fixture: ComponentFixture<ConfirmVehicleDetailsPageComponent>;
  let router: Router;
  let mockVehiceDetailsState: VehicleDetailsState;
  let store: MockStore;
  let mockVehicleDetailsStateSelector: MemoizedSelector<
    VehicleDetailsState,
    VehicleDetailsState | undefined
  >;
  beforeEach(async () => {
    mockVehiceDetailsState =
      ApiVehicleDetailsDouble.prepareVehicleDetailsState_Electric();
    await TestBed.configureTestingModule({
      imports: [ConfirmVehicleDetailsPageComponent, RouterModule.forRoot([])],
      providers: [provideMockStore({})],
    }).compileComponents();

    router = TestBed.inject(Router);

    store = TestBed.inject(MockStore);
    mockVehicleDetailsStateSelector = store.overrideSelector(
      selectVehicleDetailsState,
      mockVehiceDetailsState
    );

    fixture = TestBed.createComponent(ConfirmVehicleDetailsPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error and not call router  when radio button is not selected', () => {
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

  it('should route to adequate parking page when continue button is clicked, yes is selected and vehicle is electric', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    const spy = spyOn(router, 'navigate');
    component.confirmVehicleDetails.setValue('yes');
    fixture.detectChanges();

    btn.click();

    expect(component.isValid).toBe(true);
    expect(spy).toHaveBeenCalledWith(['adequateParking']);
  });

  it('should route to not electric vehicle page when continue button is clicked, yes is selected and vehicle is not electric', () => {
    const petrolVehicleMock: VehicleDetailsState =
      ApiVehicleDetailsDouble.prepareVehicleDetailsState_Petrol();
    mockVehicleDetailsStateSelector.setResult(petrolVehicleMock);
    store.refreshState();
    component.ngOnInit();
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
