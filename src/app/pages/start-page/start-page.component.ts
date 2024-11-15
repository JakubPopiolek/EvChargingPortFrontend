import { Component } from '@angular/core';
import { SERVICE_NAME } from '../../consts/config';
import { Router } from '@angular/router';
import { ApiApplicationService } from '../../core/services/api/application-service';
import { Store } from '@ngrx/store';
import * as fromApplicationActions from '../../core/state/store/actions/application.actions';

@Component({
  selector: 'app-start-page',
  providers: [],
  standalone: true,
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
})
export class StartPageComponent {
  serviceName: string = SERVICE_NAME;

  constructor(
    private readonly router: Router,
    private readonly apiApplicationService: ApiApplicationService,
    private readonly store: Store
  ) {}

  public onClick() {
    this.apiApplicationService.ping().subscribe({
      next: () => {
        this.beginApplication();
        this.router.navigate(['vrn']);
      },
      error: () => {
        this.router.navigate(['serviceUnavailable']);
      },
    });
  }

  private beginApplication(): void {
    this.apiApplicationService.startApplication().subscribe({
      next: (res) => {
        this.store.dispatch(fromApplicationActions.saveId({ id: res }));
      },
      error: () => {
        this.router.navigate(['serviceUnavailable']);
      },
    });
  }
}
