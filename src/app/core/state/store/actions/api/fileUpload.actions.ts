import { Action, createAction, props } from '@ngrx/store';
import { FileMetaData } from '../../../../interfaces/FileUpload.interface';

export enum ActionType {
  UPLOAD_REQUEST = '[File Upload Form] Request',
  UPLOAD_CANCEL = '[File Upload Form] Cancel',
  UPLOAD_RESET = '[File Upload Form] Reset',
  UPLOAD_STARTED = '[File Upload API] Started',
  UPLOAD_PROGRESS = '[File Upload API] Progress',
  UPLOAD_FAILURE = '[File Upload API] Failure',
  UPLOAD_COMPLETED = '[File Upload API] Success',
  DELETE_FILE = '[File Delete API] Request',
  DELETE_FILE_SUCCESS = '[File Delete API] Success',
  DELETE_FILE_FAILURE = '[File Delete API] Failure',
}

export const uploadRequest = createAction(
  ActionType.UPLOAD_REQUEST,
  props<{
    file: File;
    id: string;
  }>()
);

export const uploadFailure = createAction(
  ActionType.UPLOAD_FAILURE,
  props<{
    error: string;
  }>()
);

export const uploadCompleted = createAction(
  ActionType.UPLOAD_COMPLETED,
  props<{
    newFiles: FileMetaData[];
  }>()
);

export const deleteFile = createAction(
  ActionType.DELETE_FILE,
  props<{
    id: number;
  }>()
);

export const deleteFileSuccess = createAction(
  ActionType.DELETE_FILE_SUCCESS,
  props<{
    id: number;
  }>()
);

export const deleteFileFailure = createAction(
  ActionType.DELETE_FILE_FAILURE,
  props<{
    error: string;
  }>()
);
