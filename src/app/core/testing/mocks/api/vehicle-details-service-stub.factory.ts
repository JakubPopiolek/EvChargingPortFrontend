import { Observable, of } from 'rxjs';
import { VehicleDetails } from '../../../interfaces/VehicleDetails.interface';
import { ApiVehicleEnquiryService } from '../../../services/api/vehicle-enquiry-service';
import { ApiVehicleDetailsDouble } from '../../doubles/api/vehicle-details-result.double';
import { MethodsNames } from '../../../types/utility.types';

export class ApiVehicleDetailsServiceStubFactory {
  public static prepareWithData(
    result: VehicleDetails | undefined
  ): VehicleDetails {
    const out: Partial<ApiVehicleEnquiryService> = {
      getByRegNumber: (): Observable<VehicleDetails> => {
        if (result === undefined) {
          result = ApiVehicleDetailsDouble.prepareSuccessfulResultElectric();
        }
        return of(result);
      },
    };
    return out as VehicleDetails;
  }

  public static prepareWithMethods(
    methods: MethodsNames<ApiVehicleEnquiryService>[]
  ): ApiVehicleEnquiryService {
    const stub: Partial<ApiVehicleEnquiryService> = {};

    for (const method of methods) {
      stub[method] = () => {
        return of();
      };
    }
    return stub as ApiVehicleEnquiryService;
  }
}
