import { AppProps } from 'next/app';
import React from 'react';
import Notification from 'src/app/common/components/Notification';
import AppTheme from 'src/app/common/themes/AppTheme';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AppTheme>
			<Component {...pageProps} />
			<Notification />
		</AppTheme>
	);
}
