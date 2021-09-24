import { useFormik } from 'formik';
import { showSuccessNotification } from 'src/app/common/utilities/notifications';
import useAuth from 'src/app/common/hooks/useAuth';
import { addPostComment } from 'src/app/modules/viewPost/utilities/commentService';

interface IAddCommentProps {
	postId?: string | string[];
}

export default function AddComment({ postId }: IAddCommentProps) {
	const { authUser } = useAuth();
	const { handleChange, handleSubmit, values, resetForm } = useFormik({
		initialValues: { comment: '' },
		onSubmit,
	});

	async function onSubmit() {
		if (typeof postId !== 'string' || !authUser?.userId) return;
		const response = await addPostComment({ ...values, postId, userId: authUser.userId });
		if (response.success) {
			showSuccessNotification('Comment added');
			resetForm();
		}
	}
	return !authUser ? null : (
		<form onSubmit={handleSubmit}>
			<textarea
				name="comment"
				onChange={handleChange}
				value={values.comment}
				id="comment"
			></textarea>
			<button type="submit">Post</button>
		</form>
	);
}
