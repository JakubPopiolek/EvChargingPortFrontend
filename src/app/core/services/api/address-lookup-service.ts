import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddressResultDouble } from '../../testing/doubles/api/address-result.double';
import { AddressServiceResponse } from '../../interfaces/AddressServiceResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiAddressLookupService {
  constructor(public readonly http: HttpClient) {}
  public get(
    postcode: string | null | undefined,
    buildingNumberName: string | null | undefined
  ): Observable<AddressServiceResponse[]> {
    let mockResponse: AddressServiceResponse[];

    if (buildingNumberName === 'testSingle') {
      mockResponse = AddressResultDouble.prepareSuccessfulResultOneAddress();
    } else {
      mockResponse = AddressResultDouble.prepareSuccessfulResultTwoAddresses();
    }

    return of(mockResponse);

    // return this.http.get<addressServiceResponse[]>(
    //   'api/AddressLookup/',
    //   { params: { postcode, buildingNumberName } }
    // );
  }
}
