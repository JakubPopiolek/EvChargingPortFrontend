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
    addressLineOne: string | null | undefined,
  ): Observable<Address[]> {
    if (addressLineOne === 'testSingle') {
      return of(AddressResultDouble.prepareSuccessfulResultOneAddress());
    } else if (addressLineOne === 'testNone') {
      return of([]);
    } else {
      return of(AddressResultDouble.prepareSuccessfulResultTwoAddresses());
    }

    // return this.http.get<addressServiceResponse[]>(
    //   'api/AddressLookup/',
    //   { params: { postcode, addressLineOne } }
    // );
  }
}
