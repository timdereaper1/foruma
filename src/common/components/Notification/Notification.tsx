import React from 'react';
import styled from 'styled-components';
import { useNotification } from '../../contexts/NotificationProvider';
import IconButton from '../IconButton';

export default function Notification() {
	const { notification, dismissNotification } = useNotification();
	const duration = notification?.duration;

	React.useEffect(() => {
		if (typeof duration === 'number') setTimeout(() => dismissNotification(), duration);
	}, [duration, dismissNotification]);

	return notification?.message ? (
		<NotificationWrapper>
			<NotificationText>{notification?.message}</NotificationText>
			<IconButton iconName="times" onClick={dismissNotification} />
		</NotificationWrapper>
	) : null;
}

const NotificationWrapper = styled.div``;

const NotificationText = styled.p``;
