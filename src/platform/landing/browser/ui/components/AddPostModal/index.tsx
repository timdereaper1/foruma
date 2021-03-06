import { useFormik } from 'formik';
import React from 'react';
import { useApolloClient } from '@apollo/client';
import Modal from 'src/base/browser/ui/components/Modal';
import { showSuccessNotification } from 'src/base/browser/lib/notifications';
import { GetTrendingPostsQuery, useCreateNewPostMutation } from 'src/graphql';
import { processErrorAndLogToServer } from 'src/base/browser/lib/errorService';
import { GET_TRENDING_POSTS } from 'src/schemas/graphqlQueries';

interface AddPostProps {
	active: boolean;
	onClose(): void;
}

export default function AddPost({ active: openPost, onClose }: AddPostProps) {
	const [mutation] = useCreateNewPostMutation();
	const client = useApolloClient();
	const { values, handleChange, handleSubmit, resetForm } = useFormik({
		initialValues: { body: '' },
		onSubmit,
	});

	async function onSubmit() {
		const response = await mutation({ variables: { data: { body: values.body } } });
		if (response.errors) processErrorAndLogToServer(response.errors);
		if (response.data) {
			const cachedPosts = client.readQuery<GetTrendingPostsQuery>({
				query: GET_TRENDING_POSTS,
			});
			if (!cachedPosts) return;
			const updatedPosts = [response.data.createNewPost, ...cachedPosts.getTrendingPosts];
			client.writeQuery<GetTrendingPostsQuery>({
				query: GET_TRENDING_POSTS,
				data: {
					getTrendingPosts: updatedPosts,
				},
			});
			showSuccessNotificationAndCloseModal();
		}
	}

	function showSuccessNotificationAndCloseModal() {
		showSuccessNotification('Post created');
		onClose();
		resetForm();
	}

	return (
		<Modal active={openPost} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<textarea
					name="body"
					onChange={handleChange}
					value={values.body}
					id="body"
				></textarea>
				<button type="submit">Post</button>
			</form>
		</Modal>
	);
}
