import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-adequate-parking',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './adequate-parking.component.html',
  styleUrl: './adequate-parking.component.scss',
})
export class AdequateParkingComponent {
  constructor(private readonly router: Router) {}

  public onClick(): void {
    this.router.navigate(['name']);
  }
}
