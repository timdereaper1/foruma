import { IApiRequestResponse } from 'app/common/types';
import { showErrorNotification } from './notifications';
import { ApolloError } from '@apollo/client';

export function processApolloError<T>(error: ApolloError): IApiRequestResponse<T> {
	showErrorNotification(error.message);
	return { error: error.message };
}

export function processErrorAndLogToServer<T>(error: unknown): IApiRequestResponse<T> | void {
	console.log(error instanceof ApolloError);
	if (error instanceof ApolloError) return processApolloError(error);
}
