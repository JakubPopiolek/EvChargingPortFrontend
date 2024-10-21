import { fuelType } from '../../../enums/fuelType.enum';
import { VehicleEnquiryServiceResponse } from '../../../interfaces/VehicleEnquiryServiceResponse.interface';

export class ApiVehicleDetailsResponseDouble {
  public static prepareSuccessfulResultElectric(): VehicleEnquiryServiceResponse {
    return {
      colour: 'grey',
      fuelType: fuelType.ELECTRICITY,
      make: 'volkswagen',
      registrationNumber: 'AB12 ABC',
    };
  }

  public static prepareSuccessfulResultPetrol(): VehicleEnquiryServiceResponse {
    return {
      colour: 'grey',
      fuelType: fuelType.PETROL,
      make: 'volkswagen',
      registrationNumber: 'AB12 ABC',
    };
  }
}
