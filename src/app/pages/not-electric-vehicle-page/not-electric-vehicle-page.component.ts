import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-electric-vehicle-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-electric-vehicle-page.component.html',
  styleUrl: './not-electric-vehicle-page.component.scss',
})
export class NotElectricVehiclePageComponent {
  constructor(private readonly router: Router) {}

  public onClick() {
    this.router.navigate(['vrn']).then(() => {});
  }
}
