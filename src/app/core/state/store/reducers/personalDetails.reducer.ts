import { createReducer, on } from '@ngrx/store';
import * as fromPersonalDetailsActions from '../actions/personalDetails.actions';

export interface personalDetailsState {
  firstName?: string;
  lastName?: string;
}

export const initialState: personalDetailsState = {
  firstName: undefined,
  lastName: undefined,
};

export const nameReducer = createReducer(
  initialState,
  on(fromPersonalDetailsActions.saveName, (state, { firstName, lastName }) => ({
    ...state,
    firstName: firstName,
    lastName: lastName,
  }))
);
