import Link from 'next/link';
import React from 'react';
import { IUserPost } from 'app/common/types';
import { PostAlias, PostContent, PostItem } from './styles';

interface IPostCardProps {
	post: IUserPost;
}

export default function PostCard({ post }: IPostCardProps) {
	return (
		<Link key={post.id} href={`/posts/${post.id}`}>
			<PostItem>
				<PostContent>{post.post}</PostContent>
				<PostAlias>{post.userId}</PostAlias>
			</PostItem>
		</Link>
	);
}
