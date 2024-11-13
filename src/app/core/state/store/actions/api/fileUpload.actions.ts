import { Action, createAction, props } from '@ngrx/store';

export enum ActionType {
  UPLOAD_REQUEST = '[File Upload Form] Request',
  UPLOAD_CANCEL = '[File Upload Form] Cancel',
  UPLOAD_RESET = '[File Upload Form] Reset',
  UPLOAD_STARTED = '[File Upload API] Started',
  UPLOAD_PROGRESS = '[File Upload API] Progress',
  UPLOAD_FAILURE = '[File Upload API] Failure',
  UPLOAD_COMPLETED = '[File Upload API] Success',
}

export const uploadRequest = createAction(
  ActionType.UPLOAD_REQUEST,
  props<{
    file: File;
  }>()
);

export const uploadCancel = createAction(ActionType.UPLOAD_CANCEL);

export const uploadReset = createAction(ActionType.UPLOAD_RESET);

export const uploadStarted = createAction(ActionType.UPLOAD_STARTED);

export const uploadProgress = createAction(
  ActionType.UPLOAD_CANCEL,
  props<{
    progress: number;
  }>()
);

export const uploadFailure = createAction(
  ActionType.UPLOAD_CANCEL,
  props<{
    error: string;
  }>()
);

export const uploadCompleted = createAction(ActionType.UPLOAD_COMPLETED);
