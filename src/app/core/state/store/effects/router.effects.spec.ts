import { firstValueFrom, Observable, of, toArray } from "rxjs"
import { RouterEffects } from "./router.effects";
import { RoutingService } from "../../../services/routing";
import { RoutingServiceStubFactory } from "../../../testing/mocks/service/routing/routing-service-stub.factory";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from "@angular/router";
import { ConfirmVehicleDetails, Start, Vrn } from "../actions/router.actions";

describe('RouterEffects', () => {
    let actions$: Observable<any>;
    let effects: RouterEffects;
    let routingServiceMock: RoutingService;

    beforeEach(() => {
        routingServiceMock = RoutingServiceStubFactory.prepareWithMethods([
            'navigateToVrn',
            'navigateToStart',
            'navigateToConirmVehicleDetails'
        ])

        actions$ = of();
        TestBed.configureTestingModule({
            providers: [
                RouterEffects,
                provideMockActions(() => actions$),
                {
                    provide: RoutingService,
                    useValue: routingServiceMock,
                },
                {
                    provide: Router,
                    useValue: {} as Router,
                },
                {
                    provide: Location,
                    useValue: {} as Location,
                },
            ],
        });
        effects = TestBed.inject(RouterEffects);
    })

    it('should redirect to start page', async () => {
        const spy = spyOn(
            routingServiceMock,
            'navigateToStart'
        ).and.callThrough();
        actions$ = of(new Start)
        await firstValueFrom(effects.navigateStart$.pipe(toArray()));
        expect(spy).toHaveBeenCalled();
    })

    it('should redirect to vrn page', async () => {
        const spy = spyOn(
            routingServiceMock,
            'navigateToVrn'
        ).and.callThrough();
        actions$ = of(new Vrn)
        await firstValueFrom(effects.navigateVrn$.pipe(toArray()));
        expect(spy).toHaveBeenCalled();
    })

    it('should redirect to confirm vehicle details page', async () => {
        const spy = spyOn(
            routingServiceMock,
            'navigateToConirmVehicleDetails'
        ).and.callThrough();
        actions$ = of(new ConfirmVehicleDetails)
        await firstValueFrom(effects.navigateConfirmVehicleDetails$.pipe(toArray()));
        expect(spy).toHaveBeenCalled();
    })
})