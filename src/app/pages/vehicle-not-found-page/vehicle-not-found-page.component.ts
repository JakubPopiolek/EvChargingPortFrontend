import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicle-not-found-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vehicle-not-found-page.component.html',
  styleUrl: './vehicle-not-found-page.component.scss',
})
export class VehicleNotFoundPageComponent implements OnInit {
  public vrn: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.vrn = this.route.snapshot.queryParams['vrn'];
  }
}
