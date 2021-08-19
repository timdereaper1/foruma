import React from 'react';
import { useNotification } from '../contexts/NotificationProvider';

export default function ErrorNotification() {
	const { notification, dismissNotification } = useNotification();
	const duration = notification?.duration;

	React.useEffect(() => {
		if (typeof duration === 'number') setTimeout(() => dismissNotification(), duration);
	}, [duration, dismissNotification]);

	if (notification?.type === 'error') return <div>{notification?.message}</div>;
	return null;
}
