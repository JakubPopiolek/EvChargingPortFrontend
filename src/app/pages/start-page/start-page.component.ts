import { Component } from '@angular/core';
import { SERVICE_NAME } from '../../consts/config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-start-page',
  providers: [],
  standalone: true,
  imports: [RouterLink],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  serviceName: string = SERVICE_NAME;

  constructor() { }

}
