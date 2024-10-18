import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterSelector } from './state/store/selectors/router.selector';
import { RoutingService } from './services/routing';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, StateModule],
  providers: [
    RouterSelector,
    RoutingService,
  ],
  exports: [],
})
export class CoreModule { }