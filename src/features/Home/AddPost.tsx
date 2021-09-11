import { useFormik } from 'formik';
import React from 'react';
import Modal from 'src/common/components/Modal';
import { useNotification } from 'src/common/contexts/NotificationProvider';
import firebase from 'src/common/firebase/firebaseApp';
import useAuth from 'src/common/hooks/useAuth';

interface AddPostProps {
	active: boolean;
	onClose(): void;
}

export default function AddPost({ active: openPost, onClose }: AddPostProps) {
	const { showErrorNotification, showSuccessNotification } = useNotification();
	const { authUser } = useAuth();
	const { values, handleChange, handleSubmit, resetForm } = useFormik({
		initialValues: {
			post: '',
		},
		onSubmit() {
			firebase
				.firestore()
				.collection('posts')
				.doc()
				.set({
					createdAt: firebase.firestore.Timestamp.now(),
					post: values.post,
					userId: authUser?.userId,
				})
				.then(showSuccessNotificationAndCloseModal)
				.catch(() => {
					showErrorNotification('Cannot post message, please check your network');
				});
		},
	});

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
