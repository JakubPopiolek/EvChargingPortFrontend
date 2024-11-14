import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectVehicleDetails } from '../../core/state/store/reducers/api/vehicleDetailsService.reducer';
import { VehicleDetails } from '../../core/interfaces/VehicleDetails.interface';
import { selectPersonalDetailsState } from '../../core/state/store/reducers/personalDetails.reducer';
import { PersonalDetails } from '../../core/interfaces/PersonalDetails.interface';
import * as fromApplicationActions from '../../core/state/store/actions/application.actions';
import { ApiApplicationService } from '../../core/services/api/application-service';
import { Application } from '../../core/interfaces/Application.interface';
import { selectId } from '../../core/state/store/reducers/application.reducer';

@Component({
  selector: 'app-check-answers-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './check-answers-page.component.html',
  styleUrl: './check-answers-page.component.scss',
})
export class CheckAnswersPageComponent implements OnInit {
  public vehicleDetails?: VehicleDetails;
  public personalDetails?: PersonalDetails;
  private referenceNumber: string | null = null;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly apiApplicationService: ApiApplicationService
  ) {}

  public ngOnInit(): void {
    this.store.select(selectVehicleDetails).subscribe((details) => {
      this.vehicleDetails = details;
    });
    this.store.select(selectPersonalDetailsState).subscribe((details) => {
      this.personalDetails = details;
    });
    this.store.select(selectId).subscribe((refNumber) => {
      this.referenceNumber = refNumber;
    });
  }

  public onClick(): void {
    const submission: Application = {
      referenceNumber: this.referenceNumber,
      firstName: this.personalDetails?.firstName,
      lastName: this.personalDetails?.lastName,
      email: this.personalDetails?.email,
      address: this.personalDetails?.address,
      vrn: this.vehicleDetails?.registrationNumber,
    };

    this.apiApplicationService.submitApplication(submission).subscribe({
      next: () => {},
      error: () => {
        this.router.navigate(['serviceUnavailable']);
      },
    });
    this.router.navigate(['submitted']);
  }
}
