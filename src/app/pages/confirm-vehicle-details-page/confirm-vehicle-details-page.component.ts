import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { getVehicleDetails } from '../../core/state/store/selectors/vehicleEnquiryService.selector';
import { VehicleEnquiryServiceResponse } from '../../core/interfaces/VehicleEnquiryServiceResponse.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-vehicle-details-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './confirm-vehicle-details-page.component.html',
  styleUrl: './confirm-vehicle-details-page.component.scss',
})
export class ConfirmVehicleDetailsPageComponent implements OnInit {
  public vehicleDetails?: VehicleEnquiryServiceResponse;

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.select(getVehicleDetails).subscribe((vehicleDetailsState) => {
      this.vehicleDetails = vehicleDetailsState.vehicleDetails;
    });
    console.log(this.vehicleDetails);
  }
}
