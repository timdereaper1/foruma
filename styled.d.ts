import 'styled-components';

declare module 'styled-components' {
	interface ColorSet {
		light: string;
		medium: string;
		dark: string;
	}
	export interface DefaultTheme {
		colors: {
			background: {
				primary: ColorSet;
			};
			text: {
				primary: ColorSet;
			};
		};
	}
}
