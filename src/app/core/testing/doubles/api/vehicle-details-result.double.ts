import { VehicleEnquiryServiceResponse } from '../../../interfaces/VehicleEnquiryServiceResponse.interface';

export class ApiVehicleDetailsResponseDouble {
  public static prepareSuccessfulResultElectric(): VehicleEnquiryServiceResponse {
    return {
      colour: 'grey',
      fuelType: 'electricity',
      make: 'volkswagen',
      registrationNumber: 'AB12 ABC',
    };
  }

  public static prepareSuccessfulResultPetrol(): VehicleEnquiryServiceResponse {
    return {
      colour: 'grey',
      fuelType: 'petrol',
      make: 'volkswagen',
      registrationNumber: 'AB12 ABC',
    };
  }
}
