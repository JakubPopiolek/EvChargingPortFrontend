import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromVehicleEnquiryServiceActions from '../../actions/api/vehicleDetailsService.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ApiVehicleEnquiryService } from '../../../../services/api/vehicle-enquiry-service';
import { VehicleDetails } from '../../../../interfaces/VehicleDetails.interface';

@Injectable()
export class VehicleDetailsServiceEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly vehicleEnquiryService: ApiVehicleEnquiryService,
  ) {}

  getVehicleDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromVehicleEnquiryServiceActions.GetVehicleDetails),
        exhaustMap((action) =>
          this.vehicleEnquiryService
            .getByRegNumber(action.vehicleRegistrationNumber)
            .pipe(
              map((response: VehicleDetails) => {
                return fromVehicleEnquiryServiceActions.GetVehicleDetailsSuccess(
                  {
                    vehicleDetails: response,
                  },
                );
              }),
              catchError((error) =>
                of(
                  fromVehicleEnquiryServiceActions.GetVehicleDetailsFailure(
                    error,
                  ),
                ),
              ),
            ),
        ),
      ),
    { dispatch: true },
  );
}
