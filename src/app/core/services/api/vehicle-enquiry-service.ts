import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VehicleDetails } from '../../interfaces/VehicleDetails.interface';
import { ApiVehicleDetailsDouble } from '../../testing/doubles/api/vehicle-details.double';

@Injectable({
  providedIn: 'root',
})
export class ApiVehicleEnquiryService {
  constructor(public readonly http: HttpClient) {}

  public getByRegNumber(
    registrationNumber: string
  ): Observable<VehicleDetails> {
    //ELECTRIC
    const mockResponse: VehicleDetails =
      ApiVehicleDetailsDouble.prepareSuccessfulResultElectric();

    //PETROL
    // const mockResponse: VehicleEnquiryServiceResponse =
    //   ApiVehicleDetailsResponseDouble.prepareSuccessfulResultPetrol();

    return of(mockResponse);

    return this.http.get<VehicleDetails>('api/VehicleEnquiryService/', {
      params: { registrationNumber: registrationNumber },
    });
  }
}
