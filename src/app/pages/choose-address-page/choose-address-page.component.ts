import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAddress } from '../../core/state/store/reducers/personalDetails.reducer';
import { getAddresses } from '../../core/state/store/actions/personalDetails.actions';
import { ApiAddressLookupService } from '../../core/services/api/address-lookup-service';
import { Address } from '../../core/interfaces/PersonalDetails.interface';
import * as fromPersonalDetailsActions from '../../core/state/store/actions/personalDetails.actions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-address-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './choose-address-page.component.html',
  styleUrl: './choose-address-page.component.scss',
})
export class ChooseAddressPageComponent implements OnInit {
  public postcode?: string | null = undefined;
  public line1?: string | null = undefined;
  public addresses: Address[] = [];
  public addressSelectionForm = new FormGroup({
    selectedAddress: new FormControl('', [Validators.required]),
  });
  public formValid: boolean = true;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly addressLookupService: ApiAddressLookupService
  ) {}

  public ngOnInit(): void {
    this.store.select(selectAddress).subscribe((address) => {
      this.postcode = address?.postcode;
      this.line1 = address?.line1;
      this.addressLookupService
        .get(this.postcode, this.line1)
        .subscribe((addresses) => {
          this.addresses = addresses;
        });
    });
  }

  public onClick(): void {
    if (this.addressSelectionForm.valid) {
      this.formValid = true;
      let selectedAddressIndex: number | null | undefined = null;
      selectedAddressIndex = Number(
        this.addressSelectionForm.get('selectedAddress')?.value
      );
      if (selectedAddressIndex != null && selectedAddressIndex != undefined) {
        this.store.dispatch(
          fromPersonalDetailsActions.saveAddress({
            address: this.addresses[selectedAddressIndex],
          })
        );
        this.router.navigate(['confirmAddress'], {
          queryParams: { route: 'choose-address' },
        });
      }
    } else {
      this.formValid = false;
    }
  }
}
