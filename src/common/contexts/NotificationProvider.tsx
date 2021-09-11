import React from 'react';

interface Notification {
	message: string;
	type: 'error' | 'success';
	duration: number;
}

interface NotificationContextType {
	notification: Notification | null;
	showNotification(args: Notification): void;
	dismissNotification(): void;
}

export const NotificationContext = React.createContext<NotificationContextType | undefined>(
	undefined
);

export default function NotificationProvider({ children }: React.PropsWithChildren<{}>) {
	const [notification, setNotification] = React.useState<Notification | null>(null);

	function showNotification(args: Notification) {
		setNotification(args);
	}

	const dismissNotification = React.useCallback(() => {
		setNotification(null);
	}, []);

	return (
		<NotificationContext.Provider
			value={{ notification, dismissNotification, showNotification }}
		>
			{children}
		</NotificationContext.Provider>
	);
}

export function useNotification() {
	const context = React.useContext(NotificationContext);

	const showErrorNotification = React.useCallback((message: string) => {
		context?.showNotification({
			duration: 1000 * 10,
			message,
			type: 'error',
		});
	}, []);

	const showSuccessNotification = React.useCallback((message: string) => {
		context?.showNotification({
			duration: 1000 * 5,
			message,
			type: 'success',
		});
	}, []);

	if (typeof context === 'undefined')
		throw new Error('You cannot use `useNotification` outside NotificationProvider');

	return { ...context, showErrorNotification, showSuccessNotification };
}
