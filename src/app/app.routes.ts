import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { VrnPageComponent } from './pages/vrn-page/vrn-page.component';
import { ConfirmVehicleDetailsPageComponent } from './pages/confirm-vehicle-details-page/confirm-vehicle-details-page.component';
import { NotElectricVehiclePageComponent } from './pages/not-electric-vehicle-page/not-electric-vehicle-page.component';
import { NamePageComponent } from './pages/name-page/name-page.component';
import { EmailPageComponent } from './pages/email-page/email-page.component';
import { CheckAnswersPageComponent } from './pages/check-answers-page/check-answers-page.component';
import { AddressLookupPageComponent } from './pages/address-lookup-page/address-lookup-page.component';
import { ChooseAddressPageComponent } from './pages/choose-address-page/choose-address-page.component';
import { ConfirmAddressPageComponent } from './pages/confirm-address-page/confirm-address-page.component';
import { EnterAddressManuallyPageComponent } from './pages/enter-address-manually-page/enter-address-manually-page.component';
import { SubmittedPageComponent } from './pages/submitted-page/submitted-page.component';
import { ServiceUnavailablePageComponent } from './pages/service-unavailable-page/service-unavailable-page.component';
import { NoAddressFoundPageComponent } from './pages/no-address-found-page/no-address-found-page.component';
import { VehicleNotFoundPageComponent } from './pages/vehicle-not-found-page/vehicle-not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'start', component: StartPageComponent },
  { path: 'vrn', component: VrnPageComponent },
  {
    path: 'confirmVehicleDetails',
    component: ConfirmVehicleDetailsPageComponent,
  },
  { path: 'notElectricVehicle', component: NotElectricVehiclePageComponent },
  { path: 'name', component: NamePageComponent },
  { path: 'email', component: EmailPageComponent },
  { path: 'addressLookup', component: AddressLookupPageComponent },
  { path: 'chooseAddress', component: ChooseAddressPageComponent },
  { path: 'confirmAddress', component: ConfirmAddressPageComponent },
  {
    path: 'enterAddressManually',
    component: EnterAddressManuallyPageComponent,
  },
  { path: 'checkAnswers', component: CheckAnswersPageComponent },
  { path: 'submitted', component: SubmittedPageComponent },
  { path: 'serviceUnavailable', component: ServiceUnavailablePageComponent },
  { path: 'noAddressFound', component: NoAddressFoundPageComponent },
  { path: 'vehicleNotFound', component: VehicleNotFoundPageComponent },
];
