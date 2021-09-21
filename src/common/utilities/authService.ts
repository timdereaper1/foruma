import { IApiRequestResponse, IAuthenticatedUser } from 'src/common/types';
import { processErrorAndLogToServer } from 'src/common/utilities/errorService';
import firebase from 'src/common/utilities/firebaseApp';

export interface ISignInCredentials {
	email: string;
	password: string;
	alias: string;
}

export async function createOrSignIntoAccount(
	values: ISignInCredentials
): Promise<IApiRequestResponse<IAuthenticatedUser>> {
	try {
		const credential = await firebase
			.auth()
			.signInWithEmailAndPassword(values.email, values.password);
		const user = await getAuthenticatedUserDetails(credential.user!.uid);
		return { success: true, data: user.data };
	} catch (error) {
		const { code } = error as firebase.FirebaseError;
		return code === 'auth/user-not-found'
			? createNewUserAccountAndSignIn(values)
			: processErrorAndLogToServer(error);
	}
}

export async function createNewUserAccountAndSignIn(
	values: ISignInCredentials
): Promise<IApiRequestResponse<IAuthenticatedUser>> {
	try {
		const userCredential = await firebase
			.auth()
			.createUserWithEmailAndPassword(values.email, values.password);
		const authDetails: IAuthenticatedUser = {
			userId: userCredential.user!.uid,
			alias: values.alias,
			createdAt: firebase.firestore.Timestamp.now(),
		};
		await firebase.firestore().collection('users').doc().set(authDetails);
		return { success: true, data: authDetails };
	} catch (error) {
		return processErrorAndLogToServer(error);
	}
}

export async function getAuthenticatedUserDetails(
	id: string
): Promise<IApiRequestResponse<IAuthenticatedUser>> {
	try {
		const snapshot = await firebase
			.firestore()
			.collection('users')
			.where('userId', '==', id)
			.get();
		const user = snapshot.docs[0].data() as IAuthenticatedUser;
		return { data: user, success: true };
	} catch (error) {
		return processErrorAndLogToServer(error);
	}
}

export function signOut() {
	firebase.auth().signOut();
}
