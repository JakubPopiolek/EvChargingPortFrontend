import { Component } from '@angular/core';
import { SERVICE_NAME } from '../../consts/config';
import { RouterSelector } from '../../core/state/store/selectors/router.selector';

@Component({
  selector: 'app-start-page',
  providers: [RouterSelector],
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  serviceName: string = SERVICE_NAME;

  constructor(private readonly routerSelector: RouterSelector) { }

  public continueClick() {
    this.routerSelector.Vrn();
  }
}
