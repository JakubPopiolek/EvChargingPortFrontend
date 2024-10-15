import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EvChargingPortFrontend'

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'js-enabled');
  }

  ngOnInit(): void { };
}
