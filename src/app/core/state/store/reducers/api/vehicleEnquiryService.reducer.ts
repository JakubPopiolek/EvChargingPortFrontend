import { createReducer, on } from '@ngrx/store';
import { VehicleEnquiryServiceResponse } from '../../../../interfaces/VehicleEnquiryServiceResponse.interface';
import * as fromVehicleEnquiryServiceActions from '../../actions/api/vehicleEnquiryService.actions';

export interface vehicleDetailsState {
  vehicleDetails?: VehicleEnquiryServiceResponse;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
}

export const initialState: vehicleDetailsState = {
  vehicleDetails: undefined,
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
};

export const vehicleEnquiryServiceReducer = createReducer(
  initialState,
  on(fromVehicleEnquiryServiceActions.GetVehicleDetails, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    fromVehicleEnquiryServiceActions.GetVehicleDetailsSuccess,
    (state, { vehicleDetails }) => ({
      ...state,
      vehicleDetails: vehicleDetails,
      isLoading: false,
      isLoadingSuccess: true,
      isLoadingFailure: false,
    })
  )
);
