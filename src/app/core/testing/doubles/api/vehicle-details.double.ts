import { FuelType } from '../../../enums/FuelType.enum';
import { VehicleDetails } from '../../../interfaces/VehicleDetails.interface';
import { VehicleDetailsState } from '../../../state/store/reducers/api/vehicleDetailsService.reducer';

export class ApiVehicleDetailsDouble {
  public static prepareSuccessfulResultElectric(): VehicleDetails {
    return {
      colour: 'grey',
      fuelType: FuelType.ELECTRICITY,
      make: 'volkswagen',
      registrationNumber: 'AB12 ABC',
    };
  }

  public static prepareSuccessfulResultPetrol(): VehicleDetails {
    return {
      colour: 'grey',
      fuelType: FuelType.PETROL,
      make: 'volkswagen',
      registrationNumber: 'petrol',
    };
  }

  public static prepareVehicleDetailsState_Electric(): VehicleDetailsState {
    return {
      vehicleDetails: ApiVehicleDetailsDouble.prepareSuccessfulResultElectric(),
      isLoading: false,
      isLoadingSuccess: false,
      isLoadingFailure: false,
      isConfirmed: false,
    };
  }

  public static prepareVehicleDetailsState_Petrol(): VehicleDetailsState {
    return {
      vehicleDetails: ApiVehicleDetailsDouble.prepareSuccessfulResultPetrol(),
      isLoading: false,
      isLoadingSuccess: false,
      isLoadingFailure: false,
      isConfirmed: false,
    };
  }
}
