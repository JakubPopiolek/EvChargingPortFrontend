import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { storageSync } from '@larscom/ngrx-store-storagesync';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import * as fromVehicleEnquiryServiceReducer from './store/reducers/api/vehicleDetailsService.reducer';
import { PersonalDetails } from '../interfaces/PersonalDetails.interface';

export interface State {
  vehicleDetails: fromVehicleEnquiryServiceReducer.VehicleDetailsState;
  personalDetails: PersonalDetails;
}

const devTools: ModuleWithProviders<any>[] = [
  StoreDevtoolsModule.instrument({
    maxAge: 10,
    logOnly: environment.production,
  }),
];

export function storageSyncReducer(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  const metaReducer = storageSync<State>({
    features: [
      { stateKey: 'vehicleDetails', storageForFeature: window.sessionStorage },
      { stateKey: 'personalDetails', storageForFeature: window.sessionStorage },
    ],
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
    ...StoreDevTools,
  ],
  providers: [],
})
export class StateModule {}
