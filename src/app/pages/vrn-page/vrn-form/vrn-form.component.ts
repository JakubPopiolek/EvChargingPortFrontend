import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromVehicleEnquiryServiceActions from '../../../core/state/store/actions/api/vehicleDetailsService.actions';
import {
  selectVehicleDetails,
  selectVehicleDetailsState,
} from '../../../core/state/store/reducers/api/vehicleDetailsService.reducer';
import { VehicleDetails } from '../../../core/interfaces/VehicleDetails.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-vrn-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vrn-form.component.html',
  styleUrl: './vrn-form.component.scss',
})
export class VrnFormComponent implements OnInit, OnDestroy {
  public vrn: FormControl = new FormControl('', [Validators.required]);
  public isValid: boolean = true;
  public vehicleDetails?: VehicleDetails;
  public errorMessage: string = 'Enter vehicle registration number';
  private storeSubscribe: Subscription = new Subscription();

  constructor(private router: Router, private readonly store: Store) {}

  ngOnDestroy(): void {
    this.storeSubscribe.unsubscribe();
  }

  public ngOnInit(): void {
    this.store
      .select(selectVehicleDetails)
      .subscribe((vehicleDetails) => {
        this.vehicleDetails = vehicleDetails;
        const vehicleReg = this.vehicleDetails?.registrationNumber
          ? this.vehicleDetails.registrationNumber
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
      this.storeSubscribe = this.store
        .select(selectVehicleDetailsState)
        .subscribe((state) => {
          if (state.isLoadingSuccess) {
            this.router.navigate(['confirmVehicleDetails']);
          } else if (state.isLoadingFailure) {
            this.router.navigate(['serviceUnavailable']);
          } else {
            this.router.navigate(['vehicleNotFound'], {
              queryParams: { vrn: this.vrn.value },
            });
          }
        });
    } else {
      this.isValid = false;
      this.errorMessage = 'Enter vehicle registration number';
    }
  }
}
