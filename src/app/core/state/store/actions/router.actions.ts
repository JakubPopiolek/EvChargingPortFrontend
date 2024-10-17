import { NavigationExtras } from "@angular/router";
import { Action } from "@ngrx/store";

export enum ActionType {
    GO = '[Router] Go',
    BACK = '[Router] Back',
    START = '[Router] Start',
    VRN = '[Router] Vrn',
    FORWARD = '[Router] Forward',
    CONFIRM_VEHICLE_DETAILS = '[Router] Confirm vehicle details'
}

export class Go implements Action {
    public readonly type = ActionType.GO;
    constructor(
        public readonly payload: {
            path: any[];
            query?: object;
            extras?: NavigationExtras
        }
    ) { }
}

export class Back implements Action {
    public readonly type = ActionType.BACK
}


export class Forward implements Action {
    public readonly type = ActionType.FORWARD
}

export class Start implements Action {
    public readonly type = ActionType.START
}

export class Vrn implements Action {
    public readonly type = ActionType.VRN
}

export class ConfirmVehicleDetails implements Action {
    public readonly type = ActionType.CONFIRM_VEHICLE_DETAILS
}

export type RouterActions =
    | Go
    | Back
    | Forward
    | Start
    | Vrn
    | ConfirmVehicleDetails