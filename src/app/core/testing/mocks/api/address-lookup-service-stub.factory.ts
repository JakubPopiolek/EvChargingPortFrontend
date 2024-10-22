import { Observable, of } from 'rxjs';
import { VehicleDetails } from '../../../interfaces/VehicleDetails.interface';
import { ApiVehicleEnquiryService } from '../../../services/api/vehicle-enquiry-service';
import { ApiVehicleDetailsDouble } from '../../doubles/api/vehicle-details-result.double';
import { MethodsNames } from '../../../types/utility.types';
import { AddressServiceResponse } from '../../../interfaces/AddressServiceResponse.interface';
import { ApiAddressLookupService } from '../../../services/api/address-lookup-service';
import { AddressResultDouble } from '../../doubles/api/address-result.double';

export class ApiAddressLookupServiceStubFactory {
  public static prepareWithOneAddress(
    result: AddressServiceResponse[] | undefined
  ): AddressServiceResponse[] {
    const out: Partial<ApiAddressLookupService> = {
      get: (): Observable<AddressServiceResponse[]> => {
        if (result === undefined) {
          result = AddressResultDouble.prepareSuccessfulResultOneAddress();
        }
        return of(result);
      },
    };
    return out as AddressServiceResponse[];
  }

  public static prepareWithTwoAddresses(
    result: AddressServiceResponse[] | undefined
  ): AddressServiceResponse[] {
    const out: Partial<ApiAddressLookupService> = {
      get: (): Observable<AddressServiceResponse[]> => {
        if (result === undefined) {
          result = AddressResultDouble.prepareSuccessfulResultTwoAddresses();
        }
        return of(result);
      },
    };
    return out as AddressServiceResponse[];
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
