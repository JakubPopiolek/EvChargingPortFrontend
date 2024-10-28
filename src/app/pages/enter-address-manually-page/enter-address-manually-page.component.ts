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
  line1Valid?: boolean = true;
  cityValid?: boolean = true;
  postcodeValid?: boolean = true;
  public addressForm = new FormGroup({
    line1: new FormControl('', [Validators.required]),
    line2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    province: new FormControl(''),
    postcode: new FormControl('', [Validators.required]),
  });

  constructor(private readonly router: Router, private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.select(selectAddress).subscribe((address) => {
      this.addressForm.get('postcode')?.patchValue(address?.postcode!);
      this.addressForm.get('line1')?.patchValue(address?.line1!);
      this.addressForm.get('line2')?.patchValue(address?.line2!);
      this.addressForm.get('city')?.patchValue(address?.city!);
      this.addressForm.get('province')?.patchValue(address?.province!);
    });
  }

  public onClick(): void {
    if (this.addressForm.valid) {
      this.router.navigate(['confirmAddress']);
      this.store.dispatch(
        saveAddress({
          address: {
            postcode: this.addressForm.get('postcode')!.value,
            line1: this.addressForm.get('line1')!.value,
            line2: this.addressForm.get('line2')!.value,
            city: this.addressForm.get('city')!.value,
            province: this.addressForm.get('province')!.value,
          },
        })
      );
    } else {
      this.line1Valid = this.addressForm.get('line1')?.valid;
      this.cityValid = this.addressForm.get('city')?.valid;
      this.postcodeValid = this.addressForm.get('postcode')?.valid;
    }
  }
}
