import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { VrnPageComponent } from './pages/vrn-page/vrn-page.component';
import { ConfirmVehicleDetailsPageComponent } from './pages/confirm-vehicle-details-page/confirm-vehicle-details-page.component';
import { NotElectricVehiclePageComponent } from './pages/not-electric-vehicle-page/not-electric-vehicle-page.component';
import { NamePageComponent } from './pages/name-page/name-page.component';
import { EmailPageComponent } from './pages/email-page/email-page.component';
import { AddressPageComponent } from './pages/address-page/address-page.component';
import { CheckAnswersPageComponent } from './pages/check-answers-page/check-answers-page.component';
import { SubmittedPageComponent } from './pages/submitted-page/submitted-page.component';
import { ServiceUnavailablePageComponent } from './pages/service-unavailable-page/service-unavailable-page.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    { path: 'start', component: StartPageComponent },
    { path: 'vrn', component: VrnPageComponent },
    { path: 'confirmVehicleDetails', component: ConfirmVehicleDetailsPageComponent },
    { path: 'notElectricVehicle', component: NotElectricVehiclePageComponent },
    { path: 'name', component: NamePageComponent },
    { path: 'email', component: EmailPageComponent },
    { path: 'address', component: AddressPageComponent },
    { path: 'checkAnswers', component: CheckAnswersPageComponent },
    { path: 'submitted', component: SubmittedPageComponent },
    { path: 'serviceUnavailable', component: ServiceUnavailablePageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }