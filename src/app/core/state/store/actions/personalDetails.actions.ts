import { createAction, props } from '@ngrx/store';
import { PersonalDetails } from '../../../interfaces/PersonalDetails.interface';

export enum ActionType {
  SAVE_NAME = '[Name] Save name',
}

export const saveName = createAction(
  ActionType.SAVE_NAME,
  props<{
    firstName: PersonalDetails['firstName'];
    lastName: PersonalDetails['lastName'];
  }>()
);
