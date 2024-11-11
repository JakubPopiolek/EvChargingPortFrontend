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
    registrationNumber: string,
  ): Observable<VehicleDetails> {
    if (registrationNumber == 'petrol') {
      //PETROL
      const mockResponse: VehicleDetails =
        ApiVehicleDetailsDouble.prepareSuccessfulResultPetrol();
      return of(mockResponse);
    } else if (registrationNumber == 'testNone') {
      return of();
    } else {
      //ELECTRIC
      const mockResponse: VehicleDetails =
        ApiVehicleDetailsDouble.prepareSuccessfulResultElectric();
      return of(mockResponse);
    }

    return this.http.get<VehicleDetails>('api/VehicleEnquiryService/', {
      params: { registrationNumber: registrationNumber },
    });
  }
}
