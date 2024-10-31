import * as Actions from './applicationSubmission.actions';

describe('vehicleDetailsService actions', () => {
  it('should create an action - [ saveId ]', () => {
    const action = Actions.saveId({
      id: 'testId',
    });
    expect(action.type).toEqual(Actions.ActionType.SAVE_ID);
  });
});