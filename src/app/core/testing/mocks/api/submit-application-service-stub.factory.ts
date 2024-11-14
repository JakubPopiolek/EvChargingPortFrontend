import { of } from 'rxjs';
import { MethodsNames } from '../../../types/utility.types';
import { ApiSubmitApplicationService } from '../../../services/api/application-service';

export class ApiSubmitApplicationServiceStubFactory {
  public static prepareWithMethods(
    methods: MethodsNames<ApiSubmitApplicationService>[]
  ): ApiSubmitApplicationService {
    const stub: Partial<ApiSubmitApplicationService> = {};

    for (const method of methods) {
      stub[method] = () => {
        return of();
      };
    }
    return stub as ApiSubmitApplicationService;
  }
}
