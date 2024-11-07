import { Component } from '@angular/core';
import { SERVICE_NAME } from '../../consts/config';
import { Router } from '@angular/router';
import { ApiSubmitApplicationService } from '../../core/services/api/submit-application-service';

@Component({
  selector: 'app-start-page',
  providers: [],
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
})
export class StartPageComponent {
  serviceName: string = SERVICE_NAME;

  constructor(
    private readonly router: Router,
    private readonly apiSubmitApplicationService: ApiSubmitApplicationService
  ) {}

  public onClick() {
    this.apiSubmitApplicationService.ping().subscribe({
      next: () => {
        this.router.navigate(['vrn']);
      },
      error: () => {
        this.router.navigate(['serviceUnavailable']);
      },
    });
  }
}
