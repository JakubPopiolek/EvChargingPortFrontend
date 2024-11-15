import { UploadStatus } from '../../../../enums/UploadStatus.enum';
import * as fromFileUploadActions from '../../actions/api/fileUpload.actions';
import * as fromFileUploadReducer from './fileUpload.reducer';

describe('fileUploadReducer', () => {
  describe('UploadRequest', () => {
    it('should return correct state', () => {
      const { initialState } = fromFileUploadReducer;
      const newState = { ...initialState, status: UploadStatus.Requested };
      const action = fromFileUploadActions.uploadRequest;
      const state = fromFileUploadReducer.reducer(undefined, action);
      expect(state).toEqual(newState);
    });
  });

  describe('UploadFailure', () => {
    it('should return correct state', () => {
      const { initialState } = fromFileUploadReducer;
      const newState = {
        ...initialState,
        status: UploadStatus.Failed,
        error: 'error',
      };
      const action = fromFileUploadActions.uploadFailure({ error: 'error' });
      const state = fromFileUploadReducer.reducer(initialState, action);
      expect(state).toEqual(newState);
    });
  });
  describe('UploadCompleted', () => {
    it('should return correct state', () => {
      const { initialState } = fromFileUploadReducer;
      const newState = {
        ...initialState,
        progress: 100,
        status: UploadStatus.Completed,
        files: [{ id: 123, name: 'test-name' }],
      };
      const action = fromFileUploadActions.uploadCompleted({
        newFiles: [{ id: 123, name: 'test-name' }],
      });
      const state = fromFileUploadReducer.reducer(undefined, action);
      expect(state).toEqual(newState);
    });
  });

  describe('deleteFile', () => {
    it('should return correct state', () => {
      const initialState = {
        progress: null,
        status: UploadStatus.Ready,
        error: null,
        files: [
          { id: 123, name: 'test-name' },
          { id: 321, name: 'test-name-2' },
        ],
      };
      const newState = {
        ...initialState,
        files: [{ id: 321, name: 'test-name-2' }],
      };
      const action = fromFileUploadActions.deleteFile({
        id: 123,
      });
      const state = fromFileUploadReducer.reducer(initialState, action);
      expect(state).toEqual(newState);
    });
  });
});
