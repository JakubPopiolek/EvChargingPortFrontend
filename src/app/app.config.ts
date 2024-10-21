import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { metaReducers } from './core/state/state.module';
import { vehicleEnquiryServiceReducer } from './core/state/store/reducers/api/vehicleEnquiryService.reducer';
import { VehicleEnquiryServiceEffects } from './core/state/store/effects/api/vehicleEnquiryService.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore(routerReducer, {
      runtimeChecks: {},
      metaReducers: metaReducers,
    }),
    provideEffects(VehicleEnquiryServiceEffects),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState({
      name: 'vehicleDetails',
      reducer: vehicleEnquiryServiceReducer,
    }),
  ],
};
