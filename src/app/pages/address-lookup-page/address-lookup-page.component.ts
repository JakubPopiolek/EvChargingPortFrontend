import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { postcodeValidator } from 'postcode-validator';
import { ApiAddressLookupService } from '../../core/services/api/address-lookup-service';
import { Store } from '@ngrx/store';
import * as fromPersonalDetailsActions from '../../core/state/store/actions/personalDetails.actions';
import { PersonalDetails } from '../../core/interfaces/PersonalDetails.interface';
import { selectPersonalDetailsState } from '../../core/state/store/reducers/personalDetails.reducer';

@Component({
  selector: 'app-address-lookup-page',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './address-lookup-page.component.html',
  styleUrl: './address-lookup-page.component.scss',
})
export class AddressLookupPageComponent implements OnInit {
  public addressLookupForm = new FormGroup({
    postcode: new FormControl('', [Validators.required]),
    buildingNumberName: new FormControl('', [Validators.required]),
  });
  public postcodeValid?: boolean = true;
  public buildingNumberNameValid?: boolean = true;

  constructor(
    private readonly router: Router,
    private readonly apiAddressLookupService: ApiAddressLookupService,
    private readonly store: Store
  ) {}

  public ngOnInit(): void {
    this.store.select(selectPersonalDetailsState).subscribe((state) => {
      this.addressLookupForm.get('postcode')?.setValue(state.postcode);
      this.addressLookupForm
        .get('buildingNumberName')
        ?.setValue(state.buildingNumberName);
    });
  }

  public onClick(): void {
    if (this.addressLookupForm.valid) {
      this.buildingNumberNameValid = true;
      this.postcodeValid = true;
      const postcode = this.addressLookupForm.get('postcode')!.value;
      const buildingNumberName =
        this.addressLookupForm.get('buildingNumberName')!.value;
      this.store.dispatch(
        fromPersonalDetailsActions.saveInitialAddress({
          postcode,
          buildingNumberName,
        })
      );
      this.getAddresses(postcode, buildingNumberName);
    } else {
      this.postcodeValid = this.addressLookupForm.get('postcode')?.valid;
      this.buildingNumberNameValid =
        this.addressLookupForm.get('buildingNumberName')?.valid;
    }
  }

  private getAddresses(
    postcode: PersonalDetails['postcode'],
    buildingNumberName: PersonalDetails['buildingNumberName']
  ) {
    this.apiAddressLookupService
      .get(postcode, buildingNumberName)
      .subscribe((res) => {
        if (res.length > 1) {
          this.router.navigate(['chooseAddress']);
        } else {
          this.router.navigate(['confirmAddress']);
        }
      });
  }
}
