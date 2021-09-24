import { AppProps } from 'next/app';
import React from 'react';
import Notification from 'src/common/components/Notification';
import AppTheme from 'src/common/themes/AppTheme';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AppTheme>
			<Component {...pageProps} />
			<Notification />
		</AppTheme>
	);
}
