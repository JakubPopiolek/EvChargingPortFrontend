import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { RouterEffects } from './core/state/store/effects/router.effects';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideStore({ router: routerReducer }), provideEffects(RouterEffects), provideRouterStore(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};

