import { createFeatureSelector, createSelector } from '@ngrx/store';
import { personalDetailsState } from '../reducers/personalDetails.reducer';

export const getFirstNameState =
  createFeatureSelector<personalDetailsState>('firstName');
export const getLastNameState =
  createFeatureSelector<personalDetailsState>('lastName');

export const getName = createSelector(
  getFirstNameState,
  getLastNameState,
  (store: personalDetailsState) => store
);
