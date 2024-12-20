import * as fromVehicleDetailsReducer from './vehicleDetailsService.reducer';
import * as fromVehicleDetailsActions from '../../actions/api/vehicleDetailsService.actions';
import { ApiVehicleDetailsDouble } from '../../../../testing/doubles/api/vehicle-details.double';

describe('vehicleDetailsServiceReducer', () => {
  describe('GetVehicleDetails', () => {
    it('should return correct state', () => {
      const { initialVehicleDetailsState } = fromVehicleDetailsReducer;
      const newState = { ...initialVehicleDetailsState, isLoading: true };
      const action = fromVehicleDetailsActions.GetVehicleDetails;
      const state = fromVehicleDetailsReducer.reducer(undefined, action);
      expect(state).toEqual(newState);
    });
  });

  describe('GetVehicleDetailsSuccess', () => {
    it('should return correct state', () => {
      const { initialVehicleDetailsState } = fromVehicleDetailsReducer;
      const mockVehicleDetails =
        ApiVehicleDetailsDouble.prepareSuccessfulResultElectric();
      const newState = {
        ...initialVehicleDetailsState,
        vehicleDetails: mockVehicleDetails,
        isLoading: false,
        isLoadingSuccess: true,
        isLoadingFailure: false,
      };
      const action = fromVehicleDetailsActions.GetVehicleDetailsSuccess({
        vehicleDetails: mockVehicleDetails,
      });
      const state = fromVehicleDetailsReducer.reducer(undefined, action);
      expect(state).toEqual(newState);
    });
  });

  describe('GetVehicleDetailsFailure', () => {
    it('should return correct state', () => {
      const { initialVehicleDetailsState } = fromVehicleDetailsReducer;
      const newState = {
        ...initialVehicleDetailsState,
        isLoading: false,
        isLoadingSuccess: false,
        isLoadingFailure: true,
      };
      const action = fromVehicleDetailsActions.GetVehicleDetailsFailure;
      const state = fromVehicleDetailsReducer.reducer(undefined, action);
      expect(state).toEqual(newState);
    });
  });

  describe('ClearVehicleDetails', () => {
    it('should return correct state', () => {
      const { initialVehicleDetailsState } = fromVehicleDetailsReducer;
      const newState = {
        ...initialVehicleDetailsState,
        vehicleDetails: undefined,
        isLoading: false,
        isLoadingSuccess: false,
        isLoadingFailure: false,
      };
      const action = fromVehicleDetailsActions.ClearVehicleDetails;
      const state = fromVehicleDetailsReducer.reducer(undefined, action);
      expect(state).toEqual(newState);
    });
  });

  describe('ConfirmVehicleDetails', () => {
    it('should return correct state', () => {
      const { initialVehicleDetailsState } = fromVehicleDetailsReducer;
      const newState = {
        ...initialVehicleDetailsState,
        vehicleDetails: undefined,
        isLoading: false,
        isLoadingSuccess: false,
        isLoadingFailure: false,
        isConfirmed: true,
      };
      const action = fromVehicleDetailsActions.ConfirmVehicleDetails;
      const state = fromVehicleDetailsReducer.reducer(undefined, action);
      expect(state).toEqual(newState);
    });
  });
});
