import { VehicleEnquiryServiceResponse } from '../../../interfaces/VehicleEnquiryServiceResponse.interface';

export class ApiVehicleDetailsResponseDouble {
  public static prepareSuccessfulResult(): VehicleEnquiryServiceResponse {
    return {
      colour: 'grey',
      fuelType: 'electricity',
      make: 'volkswagen',
      registrationNumber: 'AB12 ABC',
    };
  }
}
