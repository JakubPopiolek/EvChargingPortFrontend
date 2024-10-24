import { createFeature, createReducer, on } from '@ngrx/store';
import * as fromPersonalDetailsActions from '../actions/personalDetails.actions';
import { PersonalDetails } from '../../../interfaces/PersonalDetails.interface';

export const initialState: PersonalDetails = {
  firstName: null,
  lastName: null,
  email: null,
  address: {
    postcode: null,
    addressLineOne: null,
    addressLineTwo: null,
    townOrCity: null,
    county: null,
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
    (state, { postcode, addressLineOne }) => ({
      ...state,
      address: {
        ...state.address!,
        postcode,
        addressLineOne,
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
