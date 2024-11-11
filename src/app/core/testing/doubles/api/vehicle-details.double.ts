import { fuelType } from '../../../enums/fuelType.enum';
import { VehicleDetails } from '../../../interfaces/VehicleDetails.interface';
import { VehicleDetailsState } from '../../../state/store/reducers/api/vehicleDetailsService.reducer';

export class ApiVehicleDetailsDouble {
  public static prepareSuccessfulResultElectric(): VehicleDetails {
    return {
      colour: 'grey',
      fuelType: fuelType.ELECTRICITY,
      make: 'volkswagen',
      registrationNumber: 'AB12 ABC',
    };
  }

  public static prepareSuccessfulResultPetrol(): VehicleDetails {
    return {
      colour: 'grey',
      fuelType: fuelType.PETROL,
      make: 'volkswagen',
      registrationNumber: 'petrol',
    };
  }

  public static prepareVehicleDetailsState(): VehicleDetailsState {
    return {
      vehicleDetails: ApiVehicleDetailsDouble.prepareSuccessfulResultElectric(),
      isLoading: false,
      isLoadingSuccess: false,
      isLoadingFailure: false,
      isConfirmed: false,
    };
  }
}
