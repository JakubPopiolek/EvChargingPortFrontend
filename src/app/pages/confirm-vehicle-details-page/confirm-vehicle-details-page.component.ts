import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { VehicleEnquiryServiceResponse } from '../../core/interfaces/VehicleEnquiryServiceResponse.interface';
import { getVehicleDetails } from '../../core/state/store/selectors/api/vehicleEnquiryService.selector';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { fuelType } from '../../core/enums/fuelType.enum';

@Component({
  selector: 'app-confirm-vehicle-details-page',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './confirm-vehicle-details-page.component.html',
  styleUrl: './confirm-vehicle-details-page.component.scss',
})
export class ConfirmVehicleDetailsPageComponent implements OnInit {
  public vehicleDetails?: VehicleEnquiryServiceResponse;
  public confirmVehicleDetails = new FormControl('', Validators.required);
  public isValid = true;

  constructor(private readonly store: Store, private readonly router: Router) {}

  public ngOnInit(): void {
    this.store.select(getVehicleDetails).subscribe((vehicleDetailsState) => {
      this.vehicleDetails = vehicleDetailsState.vehicleDetails;
    });
  }

  public onClick(): void {
    if (
      this.confirmVehicleDetails.valid &&
      this.confirmVehicleDetails.value == 'yes'
    ) {
      this.handleYesPath();
    } else if (
      this.confirmVehicleDetails.valid &&
      this.confirmVehicleDetails.value == 'no'
    ) {
      this.router.navigate(['vrn']);
    } else {
      this.isValid = false;
    }
  }

  private handleYesPath() {
    if (this.vehicleDetails?.fuelType == fuelType.ELECTRICITY) {
      this.router.navigate(['name']);
    } else {
      this.router.navigate(['notElectricVehicle']);
    }
  }
}
