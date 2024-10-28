import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAddress } from '../../core/state/store/reducers/personalDetails.reducer';
import { Address } from '../../core/interfaces/PersonalDetails.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirm-address-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirm-address-page.component.html',
  styleUrl: './confirm-address-page.component.scss',
})
export class ConfirmAddressPageComponent implements OnInit {
  public displayAddress?: Address = {
    id: '',
    line1: '',
    line2: '',
    city: '',
    province: '',
    postcode: '',
  };
  constructor(private readonly store: Store, private readonly router: Router) {}

  ngOnInit(): void {
    this.store.select(selectAddress).subscribe((address) => {
      this.displayAddress = { ...address! };
    });
  }

  public onClick(): void {
    this.router.navigate(['checkAnswers']);
  }
}
