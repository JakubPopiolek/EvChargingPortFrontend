import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VehicleEnquiryServiceResponse } from '../../interfaces/VehicleEnquiryServiceResponse.interface';
import { ApiVehicleDetailsResponseDouble } from '../../testing/doubles/api/vehicle-details-result.double';

@Injectable({
  providedIn: 'root',
})
export class ApiVehicleEnquiryService {
  constructor(public readonly http: HttpClient) {}

  public getByRegNumber(
    registrationNumber: string
  ): Observable<VehicleEnquiryServiceResponse> {
    //ELECTRIC
    // const mockResponse: VehicleEnquiryServiceResponse =
    //   ApiVehicleDetailsResponseDouble.prepareSuccessfulResultElectric();

    //PETROL
    const mockResponse: VehicleEnquiryServiceResponse =
      ApiVehicleDetailsResponseDouble.prepareSuccessfulResultPetrol();

    return of(mockResponse);

    // return this.http.get<VehicleEnquiryServiceResponse>(
    //   'api/VehicleEnquiryService/',
    //   { params: { registrationNumber: registrationNumber } }
    // );
  }
}
