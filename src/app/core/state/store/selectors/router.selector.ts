import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers/app.reducer";
import * as fromRouter from '../actions/router.actions'
import { RouterParams } from "../../../interfaces/router-params.interface";

@Injectable()
export class RouterSelector {
    constructor(private store: Store<AppState>) { }
    private dispatch(action: fromRouter.RouterActions): void {
        this.store.dispatch(action)
    }

    public back(): void {
        this.dispatch(new fromRouter.Back());
    }

    public go(routerParams: RouterParams): void {
        this.dispatch(new fromRouter.Go(routerParams));
    }

    public forward(): void {
        this.dispatch(new fromRouter.Forward());
    }

    public Start(): void {
        this.dispatch(new fromRouter.Start());
    }

    public Vrn(): void {
        this.dispatch(new fromRouter.Vrn());
    }

    public ConfirmVehicleDetails(): void {
        this.dispatch(new fromRouter.ConfirmVehicleDetails());
    }
}