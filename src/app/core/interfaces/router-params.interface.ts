import { NavigationExtras } from '@angular/router';

export interface RouterParams {
    path: any[];
    query?: object | undefined;
    extras?: NavigationExtras | undefined;
}