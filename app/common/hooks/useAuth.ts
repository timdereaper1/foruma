import React from 'react';
import { IAuthenticatedUser } from '../types';
import { ISignInCredentials } from 'app/common/utilities/authService';
import BrowserStorage from 'app/common/utilities/browserStorage';
import { useSignInToAccountMutation } from 'app/graphql';
import { useApolloClient } from '@apollo/client';

export default function useAuth() {
	const [mutate] = useSignInToAccountMutation();
	const client = useApolloClient();
	const [authUser, setAuthUser] = React.useState<IAuthenticatedUser | null>(() => {
		const storedUser = BrowserStorage.getItem<IAuthenticatedUser>('auth/user');
		return storedUser ? storedUser : null;
	});

	async function signInUser(args: ISignInCredentials) {
		const response = await mutate({ variables: { data: args } });
		if (response.data) {
			BrowserStorage.setItem('auth/user', response.data.signInToAccount);
			setAuthUser(response.data.signInToAccount ?? null);
		}
		return response;
	}

	function signOutUser() {
		client.resetStore().then(() => {
			BrowserStorage.removeItem('auth/user');
			setAuthUser(null);
		});
	}

	return { authUser, signOutUser, signInUser };
}
