import { PersonalDetails } from '../../../interfaces/PersonalDetails.interface';
import * as fromPersonalDetailsActions from '../actions/personalDetails.actions';
import * as fromPersonalDetailsReducer from '../reducers/personalDetails.reducer';

describe('personalDetailsReducer', () => {
  describe('SaveName', () => {
    it('should return correct state', () => {
      const { initialState } = fromPersonalDetailsReducer;
      const newState = {
        ...initialState,
        firstName: 'testFirstName',
        lastName: 'testLastName',
      };
      const action = fromPersonalDetailsActions.saveName({
        firstName: 'testFirstName',
        lastName: 'testLastName',
      });
      const state = fromPersonalDetailsReducer.reducer(initialState, action);
      expect(state).toEqual(newState);
    });
  });

  describe('SaveEmail', () => {
    it('should return correct state', () => {
      const { initialState } = fromPersonalDetailsReducer;
      const newState = {
        ...initialState,
        email: 'test@email.com',
      };
      const action = fromPersonalDetailsActions.saveEmail({
        email: 'test@email.com',
      });
      const state = fromPersonalDetailsReducer.reducer(initialState, action);
      expect(state).toEqual(newState);
    });
  });

  describe('SaveInitialAddress', () => {
    it('should return correct state', () => {
      const { initialState } = fromPersonalDetailsReducer;
      const newState: PersonalDetails = {
        ...initialState,
        address: {
          ...initialState.address!,
          postcode: 'testPostcode',
          line1: 'testAddressLineOne',
        },
      };
      const action = fromPersonalDetailsActions.saveInitialAddress({
        postcode: 'testPostcode',
        line1: 'testAddressLineOne',
      });
      const state: PersonalDetails = fromPersonalDetailsReducer.reducer(
        initialState,
        action,
      );
      expect(state).toEqual(newState);
    });
  });

  describe('SaveAddress', () => {
    it('should return correct state', () => {
      const { initialState } = fromPersonalDetailsReducer;
      const newState: PersonalDetails = {
        ...initialState,
        address: {
          postcode: 'testPostcode',
          line1: 'testAddressLineOne',
          line2: 'testAddressLineTwo',
          province: 'testCounty',
          city: 'testTownOrCity',
        },
      };
      const action = fromPersonalDetailsActions.saveAddress({
        address: {
          postcode: 'testPostcode',
          line1: 'testAddressLineOne',
          line2: 'testAddressLineTwo',
          province: 'testCounty',
          city: 'testTownOrCity',
        },
      });
      const state: PersonalDetails = fromPersonalDetailsReducer.reducer(
        initialState,
        action,
      );
      expect(state).toEqual(newState);
    });
  });
});
