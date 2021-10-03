import React from 'react';
import { Posts } from './styles';
import PostCard from 'src/platform/landing/browser/ui/components/PostCard';
import { GetTrendingPostsQuery } from 'src/graphql';

interface IPostsListProps {
	posts: GetTrendingPostsQuery;
}

export default function PostsList({ posts }: IPostsListProps) {
	return !posts ? (
		<div>There is no posts available</div>
	) : (
		<Posts>
			{posts.getTrendingPosts.map((post) => (
				<PostCard key={post?.id} post={post} />
			))}
		</Posts>
	);
}
