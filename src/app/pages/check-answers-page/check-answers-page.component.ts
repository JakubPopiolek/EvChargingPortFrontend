import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectVehicleDetails } from '../../core/state/store/reducers/api/vehicleDetailsService.reducer';
import { VehicleDetails } from '../../core/interfaces/VehicleDetails.interface';
import { selectPersonalDetailsState } from '../../core/state/store/reducers/personalDetails.reducer';
import { PersonalDetails } from '../../core/interfaces/PersonalDetails.interface';
import { ApiSubmitApplicationService } from '../../core/services/api/submit-application-service';
import { ApplicationSubmission } from '../../core/interfaces/ApplicationSubmission.interface';
import * as fromApplicationSubmissionActions from '../../core/state/store/actions/applicationSubmission.actions';

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

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly apiSubmitApplicationService: ApiSubmitApplicationService,
  ) {}

  public ngOnInit(): void {
    this.store.select(selectVehicleDetails).subscribe((details) => {
      this.vehicleDetails = details;
    });
    this.store.select(selectPersonalDetailsState).subscribe((details) => {
      this.personalDetails = details;
    });
  }

  public onClick(): void {
    const submission: ApplicationSubmission = {
      firstName: this.personalDetails?.firstName,
      lastName: this.personalDetails?.lastName,
      email: this.personalDetails?.email,
      address: this.personalDetails?.address,
      vrn: this.vehicleDetails?.registrationNumber,
    };

    this.apiSubmitApplicationService.post(submission).subscribe({
      next: (res) => {
        this.store.dispatch(
          fromApplicationSubmissionActions.saveId({ id: res.id }),
        );
      },
      error: () => {
        this.router.navigate(['serviceUnavailable']);
      },
    });
    this.router.navigate(['submitted']);
  }
}
