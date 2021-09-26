import React from 'react';
import { IUserPost } from 'app/common/types';
import { getRecommendedPosts } from 'app/modules/landing/utilities/postService';
import LandingPageToolbar from './components/LandingPageToolbar';
import PostsList from './components/PostsList';

export default function LandingPage() {
	const [posts, setPosts] = React.useState<IUserPost[]>([]);

	React.useEffect(() => {
		async function fetchPostsToShow() {
			const response = await getRecommendedPosts();
			setPosts(response.data ?? []);
		}
		fetchPostsToShow();
	}, []);

	return (
		<div>
			<LandingPageToolbar />
			<PostsList posts={posts} />
		</div>
	);
}
