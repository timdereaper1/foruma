import { AppProps } from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import Notification from 'app/common/components/Notification';
import AppTheme from 'app/common/themes/AppTheme';
import { useApollo } from 'app/apolloClient';

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
