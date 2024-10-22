import { createFeature, createReducer, on } from '@ngrx/store';
import * as fromPersonalDetailsActions from '../actions/personalDetails.actions';

export interface personalDetailsState {
  firstName: string | null;
  lastName: string | null;
}

export const initialState: personalDetailsState = {
  firstName: null,
  lastName: null,
};

export const personalDetailsReducer = createReducer(
  initialState,
  on(fromPersonalDetailsActions.saveName, (state, { firstName, lastName }) => ({
    ...state,
    firstName: firstName,
    lastName: lastName,
  }))
);

export const personalDetailsFeature = createFeature({
  name: 'personalDetails',
  reducer: personalDetailsReducer,
});

export const {
  reducer,
  selectPersonalDetailsState,
  selectFirstName,
  selectLastName,
} = personalDetailsFeature;
