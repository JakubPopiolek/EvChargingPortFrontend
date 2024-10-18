import { RoutingService } from "../../../../services/routing";
import { MethodsNames } from "../../../../types/utility.types";

export class RoutingServiceStubFactory {
  public static prepareWithMethods(
    methods: MethodsNames<RoutingService>[]
  ): RoutingService {
    const stub: Partial<RoutingService> = {};

    for (const method of methods) {
      stub[method] = () => {
        return Promise.resolve(true);
      };
    }

    return stub as RoutingService;
  }
}