import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiAddressLookupService } from '../../core/services/api/address-lookup-service';
import { Store } from '@ngrx/store';
import * as fromPersonalDetailsActions from '../../core/state/store/actions/personalDetails.actions';
import { Address } from '../../core/interfaces/PersonalDetails.interface';
import {
  selectAddress,
  selectPersonalDetailsState,
} from '../../core/state/store/reducers/personalDetails.reducer';
import { PostcodeFormComponent } from '../../shared/postcode-form/postcode-form.component';

@Component({
  selector: 'app-address-lookup-page',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    PostcodeFormComponent,
  ],
  templateUrl: './address-lookup-page.component.html',
  styleUrl: './address-lookup-page.component.scss',
})
export class AddressLookupPageComponent implements OnInit {
  public addressLookupForm = new FormGroup({
    postcode: new FormControl('', [Validators.required]),
    line1: new FormControl('', [Validators.required]),
  });
  public postcodeValid?: boolean = true;
  public addressLineOneValid?: boolean = true;

  constructor(
    private readonly router: Router,
    private readonly apiAddressLookupService: ApiAddressLookupService,
    private readonly store: Store
  ) {}

  public ngOnInit(): void {
    this.store.select(selectAddress).subscribe((address) => {
      this.addressLookupForm
        .get('postcode')
        ?.setValue(address ? address.postcode : '');
      this.addressLookupForm
        .get('line1')
        ?.setValue(address ? address.line1 : '');
    });
  }

  public onClick(): void {
    if (this.addressLookupForm.valid) {
      this.addressLineOneValid = true;
      this.postcodeValid = true;
      const postcode = this.addressLookupForm.get('postcode')!.value;
      const line1 = this.addressLookupForm.get('line1')!.value;
      this.store.dispatch(
        fromPersonalDetailsActions.saveInitialAddress({
          postcode,
          line1,
        })
      );
      this.getAddresses(postcode, line1);
    } else {
      this.postcodeValid = this.addressLookupForm.get('postcode')?.valid;
      this.addressLineOneValid = this.addressLookupForm.get('line1')?.valid;
    }
  }

  private getAddresses(
    postcode: Address['postcode'],
    addressLineOne: Address['line1']
  ) {
    this.apiAddressLookupService
      .get(postcode, addressLineOne)
      .subscribe((res) => {
        if (res.length > 1) {
          this.router.navigate(['chooseAddress']);
        } else if (res.length == 1) {
          this.router.navigate(['confirmAddress']);
        } else {
          this.router.navigate(['noAddressFound']);
        }
      });
  }
}
