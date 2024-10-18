import { RouterSelector } from '../../../state/store/selectors/router.selector';
import { MethodsNames } from '../../../types/utility.types';

export class RouterSelectorStubFactory {
    public static prepareWithMethods(
        methods: MethodsNames<RouterSelector>[]
    ): RouterSelector {
        const stub: Partial<RouterSelector> = {};

        for (const method of methods) {
            stub[method] = () => {
                return Promise.resolve(true);
            };
        }

        return stub as RouterSelector;
    }
}