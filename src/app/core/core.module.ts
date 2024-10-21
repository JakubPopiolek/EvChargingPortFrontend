import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoutingService } from './services/routing';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, StateModule],
  providers: [RoutingService],
  exports: [],
})
export class CoreModule {}
