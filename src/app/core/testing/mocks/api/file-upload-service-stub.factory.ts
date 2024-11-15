import { MethodsNames } from '../../../types/utility.types';
import { ApiFileUploadService } from '../../../services/api/file-upload-service';
import { of } from 'rxjs';

export class ApiFileUploadServiceStubFactory {
  public static prepareWithMethods(
    methods: MethodsNames<ApiFileUploadService>[]
  ): ApiFileUploadService {
    const stub: Partial<ApiFileUploadService> = {};

    for (const method of methods) {
      stub[method] = () => {
        return of();
      };
    }
    return stub as ApiFileUploadService;
  }
}
