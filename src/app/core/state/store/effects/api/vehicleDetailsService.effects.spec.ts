import { Observable, of } from 'rxjs';
import { VehicleDetailsServiceEffects } from './vehicleDetailsService.effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ApiVehicleEnquiryService } from '../../../../services/api/vehicle-enquiry-service';
import { ApiVehicleDetailsServiceStubFactory } from '../../../../testing/mocks/api/vehicle-details-service-stub.factory';
import * as fromVehicleDetailsServiceActions from '../../actions/api/vehicleDetailsService.actions';

describe('vehicleDetailsServiceEffects', () => {
  let actions$: Observable<any>;
  let effects: VehicleDetailsServiceEffects;
  let vehicleDetailsServiceMock: ApiVehicleEnquiryService;

  beforeEach(() => {
    vehicleDetailsServiceMock =
      ApiVehicleDetailsServiceStubFactory.prepareWithMethods([
        'getByRegNumber',
      ]);
    TestBed.configureTestingModule({
      providers: [
        VehicleDetailsServiceEffects,
        provideMockActions(() => actions$),
        {
          provide: ApiVehicleEnquiryService,
          useValue: vehicleDetailsServiceMock,
        },
      ],
    });
    effects = TestBed.inject(VehicleDetailsServiceEffects);
  });

  it('should get vehicle details', () => {
    const spy = spyOn(
      vehicleDetailsServiceMock,
      'getByRegNumber'
    ).and.callThrough();

    actions$ = of(fromVehicleDetailsServiceActions.GetVehicleDetails);
    effects.getVehicleDetails$.subscribe((res) => {});
    expect(spy).toHaveBeenCalled();
  });
});
