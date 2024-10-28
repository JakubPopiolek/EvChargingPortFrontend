import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddressResultDouble } from '../../testing/doubles/api/address-result.double';
import { Address } from '../../interfaces/PersonalDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiAddressLookupService {
  constructor(public readonly http: HttpClient) {}
  public get(
    postcode: string | null | undefined,
    addressLineOne: string | null | undefined
  ): Observable<Address[]> {
    let mockResponse: Address[];

    if (addressLineOne === 'testSingle') {
      mockResponse = AddressResultDouble.prepareSuccessfulResultOneAddress();
    } else {
      mockResponse = AddressResultDouble.prepareSuccessfulResultTwoAddresses();
    }

    return of(mockResponse);

    // return this.http.get<addressServiceResponse[]>(
    //   'api/AddressLookup/',
    //   { params: { postcode, addressLineOne } }
    // );
  }
}
