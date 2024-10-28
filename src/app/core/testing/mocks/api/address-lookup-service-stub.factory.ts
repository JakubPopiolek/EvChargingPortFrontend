import { Observable, of } from 'rxjs';
import { MethodsNames } from '../../../types/utility.types';
import { ApiAddressLookupService } from '../../../services/api/address-lookup-service';
import { AddressResultDouble } from '../../doubles/api/address-result.double';
import { Address } from '../../../interfaces/PersonalDetails.interface';

export class ApiAddressLookupServiceStubFactory {
  public static prepareWithOneAddress(
    result: Address[] | undefined
  ): Address[] {
    const out: Partial<ApiAddressLookupService> = {
      get: (): Observable<Address[]> => {
        if (result === undefined) {
          result = AddressResultDouble.prepareSuccessfulResultOneAddress();
        }
        return of(result);
      },
    };
    return out as Address[];
  }

  public static prepareWithTwoAddresses(
    result: Address[] | undefined
  ): Address[] {
    const out: Partial<ApiAddressLookupService> = {
      get: (): Observable<Address[]> => {
        if (result === undefined) {
          result = AddressResultDouble.prepareSuccessfulResultTwoAddresses();
        }
        return of(result);
      },
    };
    return out as Address[];
  }

  public static prepareWithMethods(
    methods: MethodsNames<ApiAddressLookupService>[]
  ): ApiAddressLookupService {
    const stub: Partial<ApiAddressLookupService> = {};

    for (const method of methods) {
      stub[method] = () => {
        return of();
      };
    }
    return stub as ApiAddressLookupService;
  }
}
