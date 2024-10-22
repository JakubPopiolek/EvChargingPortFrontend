import { createAction, props } from '@ngrx/store';
import { VehicleDetails } from '../../../../interfaces/VehicleDetails.interface';

export enum ActionType {
  GET_VEHICLE_DETAILS = '[VehicleEnquiryService] Get vehicle details',
  GET_VEHICLE_DETAILS_SUCCESS = '[VehicleEnquiryService] Get vehicle details success',
  GET_VEHICLE_DETAILS_FAILURE = '[VehicleEnquiryService] Get vehicle details failure',
  CLEAR_VEHICLE_DETAILS = '[ClearVehicleDetails] Clear vehicle details',
}

export const GetVehicleDetails = createAction(
  ActionType.GET_VEHICLE_DETAILS,
  props<{ vehicleRegistrationNumber: string }>()
);

export const GetVehicleDetailsSuccess = createAction(
  ActionType.GET_VEHICLE_DETAILS_SUCCESS,
  props<{ vehicleDetails: VehicleDetails }>()
);

export const GetVehicleDetailsFailure = createAction(
  ActionType.GET_VEHICLE_DETAILS_FAILURE,
  props<{ error: any }>()
);

export const ClearVehicleDetails = createAction(
  ActionType.CLEAR_VEHICLE_DETAILS
);
