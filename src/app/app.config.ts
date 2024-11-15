import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { metaReducers } from './core/state/state.module';
import { vehicleDetailsFeature } from './core/state/store/reducers/api/vehicleDetailsService.reducer';
import { VehicleDetailsServiceEffects } from './core/state/store/effects/api/vehicleDetailsService.effects';
import { personalDetailsFeature } from './core/state/store/reducers/personalDetails.reducer';
import { fileUploadFeature } from './core/state/store/reducers/api/fileUpload.reducer';
import { FileUploadEffects } from './core/state/store/effects/api/fileUpload.effects';
import { applicationFeature } from './core/state/store/reducers/application.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore(routerReducer, {
      runtimeChecks: {},
      metaReducers: metaReducers,
    }),
    provideEffects(VehicleDetailsServiceEffects),
    provideEffects(FileUploadEffects),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(vehicleDetailsFeature),
    provideState(personalDetailsFeature),
    provideState(applicationFeature),
    provideState(fileUploadFeature),
  ],
};
