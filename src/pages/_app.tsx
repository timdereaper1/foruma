import { AppProps } from 'next/app';
import React from 'react';
import ErrorNotification from '../common/components/ErrorNotification';
import NotificationProvider from '../common/contexts/NotificationProvider';
import AppTheme from '../common/themes/AppTheme';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AppTheme>
			<NotificationProvider>
				<Component {...pageProps} />
				<ErrorNotification />
			</NotificationProvider>
		</AppTheme>
	);
}
