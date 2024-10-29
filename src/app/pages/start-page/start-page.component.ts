import { Component } from '@angular/core';
import { SERVICE_NAME } from '../../consts/config';
import { Router, RouterLink } from '@angular/router';
import { ApiSubmitApplicationService } from '../../core/services/api/submit-application-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-start-page',
  providers: [],
  standalone: true,
  imports: [RouterLink],
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
    console.log('here3');
    this.apiSubmitApplicationService.get().subscribe({
      next: () => {
        console.log('here');

        this.router.navigate(['vrn']);
      },
      error: () => {
        console.log('here2');

        this.router.navigate(['serviceUnavailable']);
      },
    });
  }
}
