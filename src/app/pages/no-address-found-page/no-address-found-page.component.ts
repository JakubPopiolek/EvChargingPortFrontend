import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAddress } from '../../core/state/store/reducers/personalDetails.reducer';

@Component({
  selector: 'app-no-address-found-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './no-address-found-page.component.html',
  styleUrl: './no-address-found-page.component.scss',
})
export class NoAddressFoundPageComponent implements OnInit {
  public addressLine1?: string | null = null;
  public postcode?: string | null = null;

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.select(selectAddress).subscribe((address) => {
      (this.addressLine1 = address?.line1), (this.postcode = address?.postcode);
    });
  }
}
