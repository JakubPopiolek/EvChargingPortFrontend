import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { RouterModule } from '@angular/router';
import { AppContentWrapperComponent } from './app-content-wrapper/app-content-wrapper.component';

@NgModule({
    declarations: [
        AppFooterComponent,
        AppHeaderComponent,
        AppContentWrapperComponent
    ],
    imports: [CommonModule, RouterModule],
    exports: [
        AppFooterComponent,
        AppHeaderComponent,
        AppContentWrapperComponent
    ],
})
export class AppLayoutModule { }