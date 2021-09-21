import { useFormik } from 'formik';
import React from 'react';
import Modal from 'src/common/components/Modal';
import useAuth from 'src/common/hooks/useAuth';
import { showSuccessNotification } from 'src/common/utilities/notifications';
import { addPost } from '../../utilities/postService';

interface AddPostProps {
	active: boolean;
	onClose(): void;
}

export default function AddPost({ active: openPost, onClose }: AddPostProps) {
	const { authUser } = useAuth();
	const { values, handleChange, handleSubmit, resetForm } = useFormik({
		initialValues: { post: '' },
		onSubmit,
	});

	async function onSubmit() {
		const response = await addPost(values, authUser?.userId);
		if (response.success) showSuccessNotificationAndCloseModal();
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
					name="post"
					onChange={handleChange}
					value={values.post}
					id="post"
				></textarea>
				<button type="submit">Post</button>
			</form>
		</Modal>
	);
}
