import { AppProps } from 'next/app';
import React from 'react';
import Notification from '../common/components/Notification/Notification';
import AppTheme from '../common/themes/AppTheme';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AppTheme>
			<Component {...pageProps} />
			<Notification />
		</AppTheme>
	);
}
