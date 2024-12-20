import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAddress } from '../../core/state/store/reducers/personalDetails.reducer';
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
import { concatMap, exhaustMap, mergeMap } from 'rxjs';

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
    this.store
      .select(selectAddress)
      .pipe(
        concatMap((address) => {
          this.postcode = address?.postcode;
          this.line1 = address?.line1;
          return this.addressLookupService.get(
            address?.postcode,
            address?.line1
          );
        })
      )
      .subscribe((addresses) => {
        this.addresses = addresses;
      });

    this.store.select(selectAddress).subscribe((storedAddress) => {
      this.addresses.forEach((address, index) => {
        if (JSON.stringify(address) == JSON.stringify(storedAddress)) {
          this.addressSelectionForm
            .get('selectedAddress')
            ?.setValue(`${index}`);
        }
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
