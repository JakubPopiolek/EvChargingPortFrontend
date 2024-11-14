import { createFeature, createReducer, on } from '@ngrx/store';
import * as fromFileUploadActions from '../../actions/api/fileUpload.actions';
import { UploadStatus } from '../../../../enums/UploadStatus.enum';
import { FileUpload } from '../../../../interfaces/FileUpload.interface';

export const initialState: FileUpload = {
  status: UploadStatus.Ready,
  error: null,
  progress: null,
  files: [],
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

  on(fromFileUploadActions.uploadCompleted, (state, { newFiles }) => ({
    ...state,
    status: UploadStatus.Completed,
    progress: 100,
    error: null,
    files: [...state.files, ...newFiles],
  })),

  on(fromFileUploadActions.deleteFile, (state, { id }) => ({
    ...state,
    files: state.files.filter((file) => file.id !== id),
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
