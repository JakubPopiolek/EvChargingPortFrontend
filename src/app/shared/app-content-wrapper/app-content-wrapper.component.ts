import { Component } from '@angular/core';
import { StartPageComponent } from '../../pages/start-page/start-page.component';

@Component({
  standalone: true,
  imports: [StartPageComponent],
  selector: 'app-content-wrapper',
  templateUrl: './app-content-wrapper.component.html',
  styleUrl: './app-content-wrapper.component.scss',
})
export class AppContentWrapperComponent {}
