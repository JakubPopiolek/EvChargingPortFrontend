import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { storageSync } from '@larscom/ngrx-store-storagesync';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MetaReducer, StoreModule, ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import { RouterEffects } from './store/effects/router.effects';
import { AppState, reducers } from './store/reducers/app.reducer';

const devTools: ModuleWithProviders<any>[] = [
    StoreDevtoolsModule.instrument({
        maxAge: 10,
        logOnly: environment.production,
    }),
];

export function storageSyncReducer(
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
    const metaReducer = storageSync<AppState>({
        features: [{ stateKey: 'user', storageForFeature: window.sessionStorage }],
        storage: window.localStorage,
    });

    return metaReducer(reducer);
}

export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [storeFreeze, storageSyncReducer]
    : [storageSyncReducer];

export const StoreDevTools: ModuleWithProviders<any>[] = !environment.production
    ? devTools
    : [];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        StoreRouterConnectingModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([RouterEffects]),
        ...StoreDevTools,
    ],
    providers: [],
})
export class StateModule { }