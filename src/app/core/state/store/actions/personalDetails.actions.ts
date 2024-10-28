import { createAction, props } from '@ngrx/store';
import {
  Address,
  PersonalDetails,
} from '../../../interfaces/PersonalDetails.interface';

export enum ActionType {
  SAVE_NAME = '[Personal Details] Save name',
  SAVE_EMAIL = '[Personal Details] Save Email',
  SAVE_INITIAL_ADDRESS = '[Person Details] Save Initial Address',
  SAVE_ADDRESS = '[Personal Details] Save address',
  GET_ADDRESSES = '[Personal Details] Get Addresses',
  GET_ADDRESSES_SUCCESS = '[Personal Details] Get Addresses Success',
  GET_ADDRESSES_FAILURE = '[Personal Details] Get Addresses Failure',
}

export const saveName = createAction(
  ActionType.SAVE_NAME,
  props<{
    firstName: PersonalDetails['firstName'];
    lastName: PersonalDetails['lastName'];
  }>()
);

export const saveEmail = createAction(
  ActionType.SAVE_EMAIL,
  props<{ email: PersonalDetails['email'] }>()
);

export const saveInitialAddress = createAction(
  ActionType.SAVE_INITIAL_ADDRESS,
  props<{
    postcode: Address['postcode'];
    line1: Address['line1'];
  }>()
);

export const saveAddress = createAction(
  ActionType.SAVE_ADDRESS,
  props<{
    address: Address;
  }>()
);

export const getAddresses = createAction(
  ActionType.GET_ADDRESSES,
  props<{
    postcode: string;
    line1: string;
  }>()
);

export const getAddressesSuccess = createAction(
  ActionType.GET_ADDRESSES_SUCCESS,
  props<{
    addresses: Address[];
  }>()
);

export const getAddressesFailure = createAction(
  ActionType.GET_ADDRESSES_FAILURE,
  props<{
    error: any;
  }>()
);
