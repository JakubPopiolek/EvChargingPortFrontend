import { of } from 'rxjs';
import { MethodsNames } from '../../../types/utility.types';
import { ApiApplicationService } from '../../../services/api/application-service';

export class ApiApplicationServiceStubFactory {
  public static prepareWithMethods(
    methods: MethodsNames<ApiApplicationService>[]
  ): ApiApplicationService {
    const stub: Partial<ApiApplicationService> = {};

    for (const method of methods) {
      stub[method] = () => {
        return of();
      };
    }
    return stub as ApiApplicationService;
  }
}
