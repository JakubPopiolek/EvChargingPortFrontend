import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-unavailable-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-unavailable-page.component.html',
  styleUrl: './service-unavailable-page.component.scss',
})
export class ServiceUnavailablePageComponent {}
