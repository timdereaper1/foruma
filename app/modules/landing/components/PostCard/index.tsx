import Link from 'next/link';
import React from 'react';
import { PostAlias, PostContent, PostItem } from './styles';
import { GetTrendingPostsQuery } from 'app/graphql';

interface IPostCardProps {
	post: GetTrendingPostsQuery['getTrendingPosts'][0];
}

export default function PostCard({ post }: IPostCardProps) {
	return (
		<Link key={post?.id} href={`/posts/${post?.id}`}>
			<PostItem>
				<PostContent>{post?.body}</PostContent>
				<PostAlias>{post?.user.alias}</PostAlias>
			</PostItem>
		</Link>
	);
}
