import { createFeature, createReducer, on } from '@ngrx/store';
import * as fromVehicleEnquiryServiceActions from '../../actions/api/vehicleDetailsService.actions';
import { VehicleDetails } from '../../../../interfaces/VehicleDetails.interface';

export interface VehicleDetailsState {
  vehicleDetails: VehicleDetails | undefined;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
}

export const initialVehicleDetailsState: VehicleDetailsState = {
  vehicleDetails: undefined,
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
};

const vehicleDetailsReducer = createReducer(
  initialVehicleDetailsState,
  on(fromVehicleEnquiryServiceActions.GetVehicleDetails, (state) => ({
    ...state,
    isLoading: true,
    isLoadingSuccess: false,
    isLoadingFailure: false,
  })),
  on(
    fromVehicleEnquiryServiceActions.GetVehicleDetailsSuccess,
    (state, { vehicleDetails }) => ({
      ...state,
      vehicleDetails,
      isLoading: false,
      isLoadingSuccess: true,
      isLoadingFailure: false,
    }),
  ),
  on(
    fromVehicleEnquiryServiceActions.GetVehicleDetailsFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      isLoadingSuccess: false,
      isLoadingFailure: true,
    }),
  ),
  on(fromVehicleEnquiryServiceActions.ClearVehicleDetails, (state) => ({
    ...state,
    vehicleDetails: undefined,
    isLoading: false,
    isLoadingFailure: false,
    isLoadingSuccess: false,
  })),
);

export const vehicleDetailsFeature = createFeature({
  name: 'vehicleDetails',
  reducer: vehicleDetailsReducer,
});

export const {
  name,
  reducer,
  selectVehicleDetails,
  selectIsLoading,
  selectVehicleDetailsState,
} = vehicleDetailsFeature;
