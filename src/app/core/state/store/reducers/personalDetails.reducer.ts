import { createFeature, createReducer, on } from '@ngrx/store';
import * as fromPersonalDetailsActions from '../actions/personalDetails.actions';
import { PersonalDetails } from '../../../interfaces/PersonalDetails.interface';

export const initialState: PersonalDetails = {
  firstName: null,
  lastName: null,
  email: null,
  address: {
    postcode: null,
    line1: null,
    line2: null,
    city: null,
    province: null,
  },
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
    (state, { postcode, line1 }) => ({
      ...state,
      address: {
        ...state.address!,
        postcode,
        line1,
      },
    })
  ),

  on(fromPersonalDetailsActions.saveAddress, (state, { address }) => ({
    ...state,
    address,
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
  selectEmail,
  selectAddress,
} = personalDetailsFeature;
