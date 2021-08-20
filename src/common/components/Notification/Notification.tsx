import React from 'react';
import { useNotification } from '../../contexts/NotificationProvider';

export default function Notification() {
	const { notification, dismissNotification } = useNotification();
	const duration = notification?.duration;

	React.useEffect(() => {
		if (typeof duration === 'number') setTimeout(() => dismissNotification(), duration);
	}, [duration, dismissNotification]);

	return notification?.message ? <div>{notification?.message}</div> : null;
}
