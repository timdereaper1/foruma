import { useRouter } from 'next/router';
import React from 'react';
import { IUserPost } from 'src/common/types';
import { getPostDetails } from './utilities/commentService';
import usePostComments from './hooks/usePostComments';
import AddComment from './components/AddComment';
import ViewPostPageToolbar from './components/ViewPostToolbar';
import CommentsList from './components/CommentsList';

export default function ViewPostPage() {
	const [post, setPost] = React.useState<IUserPost | null>(null);
	const {
		query: { id: postId },
	} = useRouter();
	const comments = usePostComments(postId);

	React.useEffect(() => {
		async function fetchPostDetails(id: string) {
			const response = await getPostDetails(id);
			setPost(response.data ?? null);
		}
		if (typeof postId === 'string') fetchPostDetails(postId);
	}, [postId]);

	return (
		<div>
			<ViewPostPageToolbar post={post} />
			<CommentsList comments={comments} />
			<AddComment postId={postId} />
		</div>
	);
}
