import PubSub from './pubSub';

export interface INotification {
	message: string;
	type: 'error' | 'success';
	duration: number;
}

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';

export function showErrorNotification(message: string) {
	PubSub.emit(SHOW_NOTIFICATION, {
		message,
		type: 'error',
	});
}

export function showSuccessNotification(message: string) {
	PubSub.emit(SHOW_NOTIFICATION, {
		message,
		type: 'success',
	});
}

export function dismissNotification() {
	PubSub.emit(DISMISS_NOTIFICATION);
}
