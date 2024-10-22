import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { metaReducers } from './core/state/state.module';
import { vehicleDetailsFeature } from './core/state/store/reducers/api/vehicleDetailsService.reducer';
import { VehicleDetailsServiceEffects } from './core/state/store/effects/api/vehicleDetailsService.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore(routerReducer, {
      runtimeChecks: {},
      metaReducers: metaReducers,
    }),
    provideEffects(VehicleDetailsServiceEffects),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(vehicleDetailsFeature),
  ],
};
