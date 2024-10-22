import { createFeature, createReducer, on } from '@ngrx/store';
import * as fromPersonalDetailsActions from '../actions/personalDetails.actions';

export interface personalDetailsState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  postcode: string | null;
  buildingNumberName: string | null;
  fullAddress: string | null;
}

export const initialState: personalDetailsState = {
  firstName: null,
  lastName: null,
  email: null,
  postcode: null,
  buildingNumberName: null,
  fullAddress: null,
};

export const personalDetailsReducer = createReducer(
  initialState,
  on(fromPersonalDetailsActions.saveName, (state, { firstName, lastName }) => ({
    ...state,
    firstName,
    lastName,
  })),

  on(fromPersonalDetailsActions.saveEmail, (state, { email }) => ({
    ...state,
    email,
  })),

  on(
    fromPersonalDetailsActions.saveInitialAddress,
    (state, { postcode, buildingNumberName }) => ({
      ...state,
      postcode,
      buildingNumberName,
    })
  )
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
  selectEmail,
  selectBuildingNumberName,
  selectPostcode,
} = personalDetailsFeature;
