import { createFeature, createReducer, on } from '@ngrx/store';
import { ApplicationSubmissionResponse } from '../../../interfaces/ApplicationSubmission.interface';
import * as fromApplicationSubmissionActions from '../actions/applicationSubmission.actions';

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

export const applicationSubmissionReducer = createReducer(
  initialState,
  on(fromApplicationSubmissionActions.saveId, (state, { id }) => ({
    ...state,
    id,
  })),
);

export const applicationSubmissionFeature = createFeature({
  name: 'applicationSubmission',
  reducer: applicationSubmissionReducer,
});

export const { reducer, selectId } = applicationSubmissionFeature;
