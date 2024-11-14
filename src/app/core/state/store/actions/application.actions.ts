import { createAction, props } from '@ngrx/store';

export enum ActionType {
  SAVE_ID = '[Application submission] Save Id',
}

export const saveId = createAction(ActionType.SAVE_ID, props<{ id: string }>());
