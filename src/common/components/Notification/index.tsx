import React from 'react';
import {
	dismissNotification,
	DISMISS_NOTIFICATION,
	INotification,
	SHOW_NOTIFICATION,
} from 'src/common/utilities/notifications';
import PubSub from 'src/common/utilities/pubSub';
import IconButton from 'src/common/components/IconButton';
import { NotificationWrapper, NotificationText } from './styles';

export default function Notification() {
	const [notification, setNotification] = React.useState<INotification>();
	const duration = notification?.duration;

	React.useEffect(() => {
		const eventId = PubSub.subscribe(SHOW_NOTIFICATION, setNotification);
		return () => PubSub.unsubscribe(SHOW_NOTIFICATION, eventId);
	}, []);

	React.useEffect(() => {
		const handler = () => setNotification(undefined);
		const eventId = PubSub.subscribe(DISMISS_NOTIFICATION, handler);
		return () => PubSub.unsubscribe(DISMISS_NOTIFICATION, eventId);
	}, []);

	React.useEffect(() => {
		if (typeof duration === 'number') setTimeout(dismissNotification, duration);
	}, [duration]);

	return notification?.message ? (
		<NotificationWrapper>
			<NotificationText>{notification?.message}</NotificationText>
			<IconButton iconName="times" onClick={dismissNotification} />
		</NotificationWrapper>
	) : null;
}
