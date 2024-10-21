import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromVehicleEnquiryServiceActions from '../../../core/state/store/actions/api/vehicleEnquiryService.actions';
import { vehicleDetailsState } from '../../../core/state/store/reducers/api/vehicleEnquiryService.reducer';
import { getVehicleDetails } from '../../../core/state/store/selectors/api/vehicleEnquiryService.selector';

@Component({
  selector: 'app-vrn-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vrn-form.component.html',
  styleUrl: './vrn-form.component.scss',
})
export class VrnFormComponent implements OnInit {
  public vrn = new FormControl('', [Validators.required]);
  public isValid = true;
  public vehicleDetailsState?: vehicleDetailsState;

  constructor(private router: Router, private readonly store: Store) {}

  public ngOnInit(): void {
    this.store
      .select(getVehicleDetails)
      .subscribe((details) => {
        this.vehicleDetailsState = details;
        const vehicleReg = this.vehicleDetailsState.vehicleDetails
          ?.registrationNumber
          ? this.vehicleDetailsState.vehicleDetails.registrationNumber
          : '';
        this.vrn.setValue(vehicleReg);
      })
      .unsubscribe();
  }

  public onClick() {
    this.store.dispatch(
      fromVehicleEnquiryServiceActions.GetVehicleDetails({
        vehicleRegistrationNumber: this.vrn.value ? this.vrn.value : '',
      })
    );
    if (this.vrn.valid) {
      this.router.navigate(['/confirmVehicleDetails']);
    } else {
      this.isValid = false;
    }
  }
}
