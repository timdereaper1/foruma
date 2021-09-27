import { useRouter } from 'next/router';
import React from 'react';
import AddComment from './components/AddComment';
import CommentsList from './components/CommentsList';
import { useGetPostQuery } from 'app/graphql';
import Toolbar from 'app/common/components/Toolbar';

export default function ViewPostPage() {
	const {
		query: { id: postId },
	} = useRouter();
	const { data, error, loading } = useGetPostQuery({
		variables: { data: { postId: postId as string } },
	});
	return (
		<div>
			{loading ? (
				<div>Loading</div>
			) : error ? (
				<div>{error.message}</div>
			) : data ? (
				<>
					<Toolbar />
					<article>
						<p>{data.getPost.body}</p>
						<footer>
							<small>{data.getPost.user.alias}</small>
						</footer>
					</article>
					<CommentsList comments={data.getPost.comments} />
				</>
			) : null}
			<AddComment postId={postId} />
		</div>
	);
}
