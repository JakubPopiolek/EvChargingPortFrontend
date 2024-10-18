import { createFeatureSelector, createSelector } from '@ngrx/store';
import { vehicleDetailsState } from '../reducers/vehicleEnquiryService.reducer';

export const getVehicleDetailsState =
  createFeatureSelector<vehicleDetailsState>('vehicleDetails');

export const getVehicleDetails = createSelector(
  getVehicleDetailsState,
  (store: vehicleDetailsState) => store
);
