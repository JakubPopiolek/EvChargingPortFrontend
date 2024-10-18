import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class RoutingService {
    constructor(private readonly _router: Router) { }

    public navigateToStart(): Promise<boolean> {
        return this._router.navigate(['start'])
    }

    public navigateToVrn(): Promise<boolean> {
        return this._router.navigate(['vrn'])
    }

    public navigateToConirmVehicleDetails(): Promise<boolean> {
        return this._router.navigate(['confirmVehicleDetails'])
    }

}