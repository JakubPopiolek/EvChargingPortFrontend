import { createFeature, createReducer, on } from '@ngrx/store';
import { ApplicationSubmissionResponse } from '../../../interfaces/Application.interface';
import * as fromApplicationActions from '../actions/application.actions';

export const initialState: ApplicationSubmissionResponse = {
  id: '',
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
  vrn: null,
};

export const applicationReducer = createReducer(
  initialState,
  on(fromApplicationActions.saveId, (state, { id }) => ({
    ...state,
    id,
  }))
);

export const applicationFeature = createFeature({
  name: 'application',
  reducer: applicationReducer,
});

export const { reducer, selectId } = applicationFeature;
