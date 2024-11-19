import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromVehicleEnquiryServiceActions from '../../core/state/store/actions/api/vehicleDetailsService.actions';

@Component({
  selector: 'app-not-electric-vehicle-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-electric-vehicle-page.component.html',
  styleUrl: './not-electric-vehicle-page.component.scss',
})
export class NotElectricVehiclePageComponent {
  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public onClick() {
    this.store.dispatch(fromVehicleEnquiryServiceActions.ClearVehicleDetails());
    const isChangeAnswer: boolean =
      this.activatedRoute.snapshot.queryParams['change'];
    this.router.navigate(['vrn'], {
      queryParams: { change: isChangeAnswer },
    });
  }
}
