import { Component } from '@angular/core';
import { SERVICE_NAME } from '../../config';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  serviceName: string = SERVICE_NAME;
}
