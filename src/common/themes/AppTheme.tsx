import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { GlobalStyle } from './globalstyle';

const theme: { dark: DefaultTheme['colors']; light: DefaultTheme['colors'] } = {
	dark: {
		background: {
			primary: {
				light: '#1c1c1c',
				dark: '#0f0f0f',
				medium: '#141414',
			},
		},
		text: {
			primary: {
				dark: '#000',
				medium: '#252525',
				light: '#fff',
			},
		},
	},
	light: {
		background: {
			primary: {
				light: '',
				dark: '',
				medium: '',
			},
		},
		text: {
			primary: {
				dark: '#000',
				medium: '#252525',
				light: '#fff',
			},
		},
	},
};

export default function AppTheme({ children }: React.PropsWithChildren<{}>) {
	return (
		<ThemeProvider theme={{ colors: theme.dark }}>
			<GlobalStyle />
			{children}
		</ThemeProvider>
	);
}
