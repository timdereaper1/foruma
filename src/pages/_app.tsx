import { AppProps } from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import Notification from 'src/base/browser/ui/components/Notification';
import AppTheme from 'src/base/browser/ui/themes/AppTheme';
import { useApollo } from 'src/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps);
	return (
		<ApolloProvider client={apolloClient}>
			<AppTheme>
				<Component {...pageProps} />
				<Notification />
			</AppTheme>
		</ApolloProvider>
	);
}
