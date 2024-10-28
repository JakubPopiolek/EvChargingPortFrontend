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
