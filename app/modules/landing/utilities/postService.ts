import { IApiRequestResponse, IUserPost } from 'app/common/types';
import { processErrorAndLogToServer } from 'app/common/utilities/errorService';
import firebase from 'app/common/utilities/firebaseApp';

export interface IAddPost {
	post: string;
}

export async function addPost(args: IAddPost, userId?: string): Promise<IApiRequestResponse> {
	try {
		await firebase.firestore().collection('posts').doc().set({
			createdAt: firebase.firestore.Timestamp.now(),
			post: args.post,
			userId,
		});
		return { success: true };
	} catch (error) {
		return processErrorAndLogToServer(error);
	}
}

export async function getRecommendedPosts(): Promise<IApiRequestResponse<IUserPost[]>> {
	try {
		const snapshot = await firebase
			.firestore()
			.collection('posts')
			.orderBy('createdAt', 'desc')
			.get();
		const newPosts: IUserPost[] = [];
		snapshot.forEach((doc) => {
			const post: IUserPost = { ...(doc.data() as any), id: doc.id };
			newPosts.push(post);
		});
		return { data: newPosts, success: true };
	} catch (error) {
		return processErrorAndLogToServer(error);
	}
}
