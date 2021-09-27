import React from 'react';
import LandingPageToolbar from './components/LandingPageToolbar';
import PostsList from './components/PostsList';
import { useGetTrendingPostsQuery } from 'app/graphql';

export default function LandingPage() {
	const { error, data, loading } = useGetTrendingPostsQuery();

	return (
		<div>
			<LandingPageToolbar />
			{loading ? (
				<div>loading</div>
			) : error ? (
				<div>{error.message}</div>
			) : data ? (
				<PostsList posts={data} />
			) : null}
		</div>
	);
}
