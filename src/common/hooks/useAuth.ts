import React from 'react';
import { User } from '../types';
import firebase from 'src/common/firebase/firebaseApp';

export default function useAuth() {
	const [authUser, setAuthUser] = React.useState<User | null>(() => {
		if (typeof window === 'undefined') return null;
		const storedUser = window.localStorage.getItem('auth/user');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	React.useEffect(() => {
		if (typeof window === 'undefined') return;

		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				window.localStorage.removeItem('auth/user');
				return setAuthUser(null);
			}
			const storedUser = window.localStorage.getItem('auth/user');
			if (storedUser) return;
			firebase
				.firestore()
				.collection('users')
				.where('userId', '==', user.uid)
				.get()
				.then((snapshot) => {
					const user = snapshot.docs[0].data() as User;
					setAuthUser(user);
					window.localStorage.setItem('auth/user', JSON.stringify(user));
				});
		});
	}, []);

	function signOutUser() {
		firebase.auth().signOut();
	}

	return { authUser, signOutUser };
}
