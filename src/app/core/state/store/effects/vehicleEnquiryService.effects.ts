import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiVehicleEnquiryService } from '../../../services/api/vehicle-enquiry-service';
import * as fromVehicleEnquiryServiceActions from '../actions/vehicleEnquiryService.actions';
import { VehicleEnquiryServiceResponse } from '../../../interfaces/VehicleEnquiryServiceResponse.interface';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class VehicleEnquiryServiceEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly vehicleEnquiryService: ApiVehicleEnquiryService
  ) {}

  getVehicleDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromVehicleEnquiryServiceActions.GetVehicleDetails),
        exhaustMap((action) =>
          this.vehicleEnquiryService
            .getByRegNumber(action.vehicleRegistrationNumber)
            .pipe(
              map((response: VehicleEnquiryServiceResponse) => {
                return fromVehicleEnquiryServiceActions.GetVehicleDetailsSuccess(
                  {
                    vehicleDetails: response,
                  }
                );
              }),
              catchError((error) =>
                of(
                  fromVehicleEnquiryServiceActions.GetVehicleDetailsFailure(
                    error
                  )
                )
              )
            )
        )
      ),
    { dispatch: true }
  );
}
