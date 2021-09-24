import firebase from 'src/app/common/utilities/firebaseApp';
import { IApiRequestResponse } from 'src/app/common/types';
import { showErrorNotification } from './notifications';

export function processFirebaseError<T>(error: firebase.FirebaseError): IApiRequestResponse<T> {
	showErrorNotification('An error occurred');
	return { error: error.message };
}

export function processErrorAndLogToServer<T>(error: unknown): IApiRequestResponse<T> {
	return processFirebaseError(error as firebase.FirebaseError);
}
