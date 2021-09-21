import React from 'react';
import { IPostComment } from '../types';
import { getPostComments, subscribeToPostComments } from '../utilities/commentService';

export default function usePostComments(postId?: string | string[]) {
	const [comments, setComments] = React.useState<IPostComment[]>([]);
	const isPostAvailable = Boolean(postId);

	React.useEffect(() => {
		async function fetchCommentsRelatedToPost(id: string) {
			const response = await getPostComments(id);
			setComments(response.data ?? []);
		}
		if (typeof postId === 'string') fetchCommentsRelatedToPost(postId);
	}, [postId]);

	React.useEffect(() => {
		if (typeof postId !== 'string') return;
		if (!isPostAvailable) return;
		const unsubscribe: any = subscribeToPostComments(postId, (newComment) => {
			setComments((comments) => {
				const ids = comments.map((post) => post.id);
				return ids.includes(newComment.id)
					? comments
					: ([] as IPostComment[]).concat([newComment, ...comments]);
			});
		});
		return () => unsubscribe();
	}, [isPostAvailable, postId]);

	return comments;
}
