import React from 'react';
import { Posts } from './styles';
import PostCard from 'app/modules/landing/components/PostCard';
import { GetTrendingPostsQuery } from 'app/graphql';

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
