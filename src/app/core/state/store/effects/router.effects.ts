import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RoutingService } from "../../../services/routing";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, tap } from "rxjs";
import * as fromRouter from '../actions/router.actions'

@Injectable()
export class RouterEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly location: Location,
        private readonly routingService: RoutingService
    ) { }


    navigate$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromRouter.ActionType.GO),
                map((action: fromRouter.Go) => action.payload),
                tap(({ path, query: queryParams, extras }) => {
                    this.router.navigate(path, { queryParams, ...extras });
                })
            ),
        { dispatch: false }
    );

    navigateBack$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromRouter.ActionType.BACK),
                tap(() => this.location.back())
            ),
        { dispatch: false }
    );

    navigateForward$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromRouter.ActionType.FORWARD),
                tap(() => this.location.forward())
            ),
        { dispatch: false }
    );

    navigateStart$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromRouter.ActionType.START),
                tap((value: fromRouter.Start) => this.routingService.navigateToStart())
            ),
        { dispatch: false }
    );

    navigateConfirmVehicleDetails$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromRouter.ActionType.CONFIRM_VEHICLE_DETAILS),
                tap((value: fromRouter.Start) => this.routingService.navigateToConirmVehicleDetails())
            ),
        { dispatch: false }
    );

    navigateVrn$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromRouter.ActionType.VRN),
                tap((value: fromRouter.Vrn) => this.routingService.navigateToVrn())
            ),
        { dispatch: false }
    );
}