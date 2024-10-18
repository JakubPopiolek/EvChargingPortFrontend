import { createAction, props } from '@ngrx/store';
import { VehicleEnquiryServiceResponse } from '../../../interfaces/VehicleEnquiryServiceResponse.interface';

export enum ActionType {
  GET_VEHICLE_DETAILS = '[VehicleEnquiryService] Get vehicle details',
  GET_VEHICLE_DETAILS_SUCCESS = '[VehicleEnquiryService] Get vehicle details success',
  GET_VEHICLE_DETAILS_FAILURE = '[VehicleEnquiryService] Get vehicle details failure',
}

export const GetVehicleDetails = createAction(
  ActionType.GET_VEHICLE_DETAILS,
  props<{ vehicleRegistrationNumber: string }>()
);

export const GetVehicleDetailsSuccess = createAction(
  ActionType.GET_VEHICLE_DETAILS_SUCCESS,
  props<{ vehicleDetails: VehicleEnquiryServiceResponse }>()
);

export const GetVehicleDetailsFailure = createAction(
  ActionType.GET_VEHICLE_DETAILS_FAILURE,
  props<{ error: any }>()
);
