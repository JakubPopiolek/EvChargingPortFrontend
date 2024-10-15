import { Component } from '@angular/core';
import { SERVICE_NAME } from '../../consts/config';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  serviceName: string = SERVICE_NAME;
}
