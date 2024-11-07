import * as fromApplicationSubmissionReducer from '../reducers/applicationSubmission.reducer';
import * as fromApplicationSubmissionActions from '../actions/applicationSubmission.actions';

describe('applicationSubmissionReducer', () => {
  describe('SaveId', () => {
    it('should return correct state', () => {
      const { initialState } = fromApplicationSubmissionReducer;
      const newState = {
        ...initialState,
        id: 'testId',
      };
      const action = fromApplicationSubmissionActions.saveId({
        id: 'testId',
      });
      const state = fromApplicationSubmissionReducer.reducer(
        initialState,
        action,
      );
      expect(state).toEqual(newState);
    });
  });
});
