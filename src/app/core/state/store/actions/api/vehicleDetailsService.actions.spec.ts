import { ApiVehicleDetailsDouble } from '../../../../testing/doubles/api/vehicle-details-result.double';
import * as Actions from './vehicleDetailsService.actions';

describe('vehicleDetailsService actions', () => {
  it('should create an action - [ GetVehicleDetails ]', () => {
    const action = Actions.GetVehicleDetails({
      vehicleRegistrationNumber: 'test',
    });
    expect(action.type).toEqual(Actions.ActionType.GET_VEHICLE_DETAILS);
  });

  it('should create an action - [ GetVehicleDetailsSuccess ]', () => {
    const mockVehicleDetails =
      ApiVehicleDetailsDouble.prepareSuccessfulResultElectric();
    const action = Actions.GetVehicleDetailsSuccess({
      vehicleDetails: mockVehicleDetails,
    });
    expect(action.type).toEqual(Actions.ActionType.GET_VEHICLE_DETAILS_SUCCESS);
  });

  it('should create an action - [ GetVehicleDetailsFailure ]', () => {
    const action = Actions.GetVehicleDetailsFailure({ error: 'testError' });
    expect(action.type).toEqual(Actions.ActionType.GET_VEHICLE_DETAILS_FAILURE);
  });

  it('should create an action - [ ClearVehicleDetails ]', () => {
    const action = Actions.ClearVehicleDetails();
    expect(action.type).toEqual(Actions.ActionType.CLEAR_VEHICLE_DETAILS);
  });
});
