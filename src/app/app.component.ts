import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './shared/app-header/app-header.component';
import { AppFooterComponent } from './shared/app-footer/app-footer.component';
import { AppContentWrapperComponent } from './shared/app-content-wrapper/app-content-wrapper.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartPageComponent, AppHeaderComponent, AppContentWrapperComponent, AppFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EvChargingPortFrontend'
}
