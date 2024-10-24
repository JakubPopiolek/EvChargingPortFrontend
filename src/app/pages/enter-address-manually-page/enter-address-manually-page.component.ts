import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostcodeFormComponent } from '../../shared/postcode-form/postcode-form.component';
import { saveAddress } from '../../core/state/store/actions/personalDetails.actions';
import { Address } from '../../core/interfaces/PersonalDetails.interface';
import { selectAddress } from '../../core/state/store/reducers/personalDetails.reducer';

@Component({
  selector: 'app-enter-address-manually-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    PostcodeFormComponent,
  ],
  templateUrl: './enter-address-manually-page.component.html',
  styleUrl: './enter-address-manually-page.component.scss',
})
export class EnterAddressManuallyPageComponent implements OnInit {
  addressLineOneValid?: boolean = true;
  townOrCityValid?: boolean = true;
  postcodeValid?: boolean = true;
  public addressForm = new FormGroup({
    addressLineOne: new FormControl('', [Validators.required]),
    addressLineTwo: new FormControl(''),
    townOrCity: new FormControl('', [Validators.required]),
    county: new FormControl(''),
    postcode: new FormControl('', [Validators.required]),
  });

  constructor(private readonly router: Router, private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.select(selectAddress).subscribe((address) => {
      this.addressForm.get('postcode')?.patchValue(address?.postcode!);
      this.addressForm
        .get('addressLineOne')
        ?.patchValue(address?.addressLineOne!);
      this.addressForm
        .get('addressLineTwo')
        ?.patchValue(address?.addressLineTwo!);
      this.addressForm.get('townOrCity')?.patchValue(address?.townOrCity!);
      this.addressForm.get('county')?.patchValue(address?.county!);
    });
  }

  public onClick(): void {
    if (this.addressForm.valid) {
      this.router.navigate(['confirmAddress']);
      this.store.dispatch(
        saveAddress({
          address: {
            postcode: this.addressForm.get('postcode')!.value,
            addressLineOne: this.addressForm.get('addressLineOne')!.value,
            addressLineTwo: this.addressForm.get('addressLineTwo')!.value,
            townOrCity: this.addressForm.get('townOrCity')!.value,
            county: this.addressForm.get('county')!.value,
          },
        })
      );
    } else {
      this.addressLineOneValid = this.addressForm.get('addressLineOne')?.valid;
      this.townOrCityValid = this.addressForm.get('townOrCity')?.valid;
      this.postcodeValid = this.addressForm.get('postcode')?.valid;
    }
  }
}
