import { createAction, props } from '@ngrx/store';

export enum ActionType {
  SAVE_NAME = '[Name] Save name',
}

export const saveName = createAction(
  ActionType.SAVE_NAME,
  props<{ firstName?: string; lastName?: string }>()
);
