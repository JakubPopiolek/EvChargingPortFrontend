import { fuelType } from '../../../enums/fuelType.enum';
import { VehicleDetails } from '../../../interfaces/VehicleDetails.interface';

export class ApiVehicleDetailsResponseDouble {
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
      registrationNumber: 'AB12 ABC',
    };
  }
}
