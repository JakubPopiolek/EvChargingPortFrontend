import * as Actions from './personalDetails.actions';

describe('vehicleDetailsService actions', () => {
  it('should create an action - [ saveName ]', () => {
    const action = Actions.saveName({
      firstName: 'testFirstName',
      lastName: 'testLastName',
    });
    expect(action.type).toEqual(Actions.ActionType.SAVE_NAME);
  });

  it('should create an action - [ saveEmail ]', () => {
    const action = Actions.saveEmail({
      email: 'testEmail',
    });
    expect(action.type).toEqual(Actions.ActionType.SAVE_EMAIL);
  });

  it('should create an action - [ saveInitialAddress ]', () => {
    const action = Actions.saveInitialAddress({
      postcode: 'testPostcode',
      line1: 'testAddressLineOne',
    });
    expect(action.type).toEqual(Actions.ActionType.SAVE_INITIAL_ADDRESS);
  });

  it('should create an action - [ saveAddress ]', () => {
    const action = Actions.saveAddress({
      address: {
        postcode: 'testPostcode',
        line1: 'testAddressLineOne',
        line2: 'testAddressLineTwo',
        province: 'testCounty',
        city: 'testTownOrCity',
      },
    });
    expect(action.type).toEqual(Actions.ActionType.SAVE_ADDRESS);
  });
});
