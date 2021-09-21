import React from 'react';
import { IAuthenticatedUser } from '../types';
import {
	createOrSignIntoAccount,
	ISignInCredentials,
	signOut,
} from 'src/common/utilities/authService';
import BrowserStorage from 'src/common/utilities/browserStorage';

export default function useAuth() {
	const [authUser, setAuthUser] = React.useState<IAuthenticatedUser | null>(() => {
		const storedUser = BrowserStorage.getItem<IAuthenticatedUser>('auth/user');
		return storedUser ? storedUser : null;
	});

	async function signInUser(args: ISignInCredentials) {
		const response = await createOrSignIntoAccount(args);
		if (response.data) {
			BrowserStorage.setItem('auth/user', response.data);
			setAuthUser(response.data ?? null);
		}
		return response;
	}

	function signOutUser() {
		BrowserStorage.removeItem('auth/user');
		setAuthUser(null);
		signOut();
	}

	return { authUser, signOutUser, signInUser };
}
