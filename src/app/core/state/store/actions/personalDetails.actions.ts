import { createAction, props } from '@ngrx/store';
import { PersonalDetails } from '../../../interfaces/PersonalDetails.interface';

export enum ActionType {
  SAVE_NAME = '[Personal Details] Save name',
  SAVE_EMAIL = '[Personal Details] Save Email',
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
