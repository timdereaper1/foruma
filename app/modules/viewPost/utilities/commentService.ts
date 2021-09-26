import { IPostComment } from '../types';
import firebase from 'app/common/utilities/firebaseApp';
import { IApiRequestResponse, IUserPost } from 'app/common/types';
import { processErrorAndLogToServer } from 'app/common/utilities/errorService';

interface IAddPostComment {
	comment: string;
	postId: string;
	userId: string;
}

export async function addPostComment(args: IAddPostComment): Promise<IApiRequestResponse> {
	try {
		const { comment, userId, postId } = args;
		await firebase
			.firestore()
			.collection('posts')
			.doc(postId)
			.collection('comments')
			.doc()
			.set({
				createdAt: firebase.firestore.Timestamp.now(),
				comment,
				userId,
			});
		return { success: true };
	} catch (error) {
		return processErrorAndLogToServer(error);
	}
}

export async function getPostDetails(postId: string): Promise<IApiRequestResponse<IUserPost>> {
	try {
		const snapshot = await firebase.firestore().collection('posts').doc(postId).get();
		const post = snapshot.data() as Omit<IUserPost, 'id'>;
		return { data: { ...post, id: snapshot.id }, success: true };
	} catch (error) {
		return processErrorAndLogToServer(error);
	}
}

export async function getPostComments(
	postId: string
): Promise<IApiRequestResponse<IPostComment[]>> {
	try {
		const postDocument = firebase.firestore().collection('posts').doc(postId);
		const commentsCollection = postDocument.collection('comments').orderBy('createdAt', 'desc');
		const snapshot = await commentsCollection.get();
		const newPosts: IPostComment[] = [];
		snapshot.forEach((doc) => {
			const post: IPostComment = { ...(doc.data() as any), id: doc.id };
			newPosts.push(post);
		});
		return { success: true, data: newPosts };
	} catch (error) {
		return processErrorAndLogToServer(error);
	}
}

export async function subscribeToPostComments(
	postId: string,
	subscriber: (comment: IPostComment) => void
): Promise<() => void> {
	const postDocument = firebase.firestore().collection('posts').doc(postId);
	const commentsCollection = postDocument.collection('comments');
	return commentsCollection.onSnapshot((snapshot) => {
		snapshot.docChanges().forEach((change) => {
			if (change.type === 'added') {
				const newComment = {
					...(change.doc.data() as IPostComment),
					id: change.doc.id,
				};
				subscriber(newComment);
			}
		});
	});
}
