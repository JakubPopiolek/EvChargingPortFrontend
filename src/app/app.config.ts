import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { VehicleEnquiryServiceEffects } from './core/state/store/effects/vehicleEnquiryService.effects';
import { vehicleEnquiryServiceReducer } from './core/state/store/reducers/vehicleEnquiryService.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore(routerReducer),
    provideEffects(VehicleEnquiryServiceEffects),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState({
      name: 'vehicleDetails',
      reducer: vehicleEnquiryServiceReducer,
    }),
  ],
};
