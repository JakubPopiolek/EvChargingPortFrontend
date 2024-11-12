import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAddress } from '../../core/state/store/reducers/personalDetails.reducer';
import { Address } from '../../core/interfaces/PersonalDetails.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirm-address-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirm-address-page.component.html',
  styleUrl: './confirm-address-page.component.scss',
})
export class ConfirmAddressPageComponent implements OnInit {
  public displayAddress?: Address = {
    line1: '',
    line2: '',
    city: '',
    province: '',
    postcode: '',
  };

  public backLink: String = '/addressLookup';

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.select(selectAddress).subscribe((address) => {
      this.displayAddress = { ...address! };
    });
    var navigatingFromRoute: string = this.route.snapshot.queryParams['route'];

    this.backLink = this.setBackLink(navigatingFromRoute);
  }

  public onClick(): void {
    this.router.navigate(['checkAnswers']);
  }

  private setBackLink(route: string): string {
    if (route == 'choose-address') {
      return '/chooseAddress';
    } else if (route == 'enter-manually') {
      return '/enterAddressManually';
    } else {
      return '/addressLookup';
    }
  }
}
