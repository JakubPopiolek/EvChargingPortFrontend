import * as Actions from './router.actions';

describe('Router Actions', () => {
    it('should create an anction - [ Go ]', () => {
        const action = new Actions.Go({ path: ['/'] });
        expect(action.type).toEqual(Actions.ActionType.GO);
    })

    it('should create an action - [ Back ]', () => {
        const action = new Actions.Back();
        expect(action.type).toEqual(Actions.ActionType.BACK);
    });

    it('should create an action - [ Forward ]', () => {
        const action = new Actions.Forward();
        expect(action.type).toEqual(Actions.ActionType.FORWARD);
    });

    it('should create an action - [ Start ]', () => {
        const action = new Actions.Start();
        expect(action.type).toEqual(Actions.ActionType.START);
    });

    it('should create an action - [ Vrn ]', () => {
        const action = new Actions.Vrn();
        expect(action.type).toEqual(Actions.ActionType.VRN);
    });

    it('should create an action - [ Confirm vehicle details ]', () => {
        const action = new Actions.ConfirmVehicleDetails();
        expect(action.type).toEqual(Actions.ActionType.CONFIRM_VEHICLE_DETAILS);
    });
})