import { Action, createFeature, createReducer, on } from '@ngrx/store';
import * as fromFileUploadActions from '../actions/api/fileUpload.actions';
import { UploadStatus } from '../../../enums/UploadStatus.enum';
import { FileUploadData } from '../../../interfaces/FileUploadData.interface';

export const initialState: FileUploadData = {
  status: UploadStatus.Ready,
  error: null,
  progress: null,
};

export const fileUploadReducer = createReducer(
  initialState,
  on(fromFileUploadActions.uploadRequest, (state) => ({
    ...state,
    status: UploadStatus.Requested,
    progress: null,
    error: null,
  })),

  on(fromFileUploadActions.uploadCancel, (state) => ({
    ...state,
    status: UploadStatus.Ready,
    progress: null,
    error: null,
  })),

  on(fromFileUploadActions.uploadReset, (state) => ({
    ...state,
    status: UploadStatus.Ready,
    progress: null,
    error: null,
  })),

  on(fromFileUploadActions.uploadFailure, (state, { error }) => ({
    ...state,
    status: UploadStatus.Failed,
    progress: null,
    error: error,
  })),

  on(fromFileUploadActions.uploadStarted, (state) => ({
    ...state,
    status: UploadStatus.Started,
    progress: 0,
  })),

  on(fromFileUploadActions.uploadProgress, (state, { progress }) => ({
    ...state,
    progress: progress,
  })),

  on(fromFileUploadActions.uploadCompleted, (state) => ({
    ...state,
    status: UploadStatus.Completed,
    progress: 100,
    error: null,
  }))
);

export const fileUploadFeature = createFeature({
  name: 'fileUpload',
  reducer: fileUploadReducer,
});

export const {
  reducer,
  selectFileUploadState,
  selectStatus,
  selectError,
  selectProgress,
} = fileUploadFeature;
