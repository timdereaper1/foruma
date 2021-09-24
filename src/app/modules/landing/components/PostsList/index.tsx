import React from 'react';
import { IUserPost } from 'src/app/common/types';
import { Posts } from './styles';
import PostCard from 'src/app/modules/landing/components/PostCard';

interface IPostsListProps {
	posts: IUserPost[];
}

export default function PostsList({ posts }: IPostsListProps) {
	return (
		<Posts>
			{posts.map((post) => (
				<PostCard post={post} />
			))}
		</Posts>
	);
}
