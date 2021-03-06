import { useFormik } from 'formik';
import Modal from 'src/base/browser/ui/components/Modal';
import { showSuccessNotification } from 'src/base/browser/lib/notifications';
import useAuth from 'src/base/browser/lib/hooks/useAuth';
import { processErrorAndLogToServer } from 'src/base/browser/lib/errorService';

interface AuthModalProps {
	active: boolean;
	onClose(): void;
}

export default function AuthModal({ active, onClose }: AuthModalProps) {
	const { signInUser } = useAuth();
	const { handleChange, values, handleSubmit, resetForm, isSubmitting } = useFormik({
		initialValues: {
			alias: '',
			email: '',
			password: '',
		},
		onSubmit,
	});

	async function onSubmit() {
		const response = await signInUser(values);
		if (response.errors) processErrorAndLogToServer(response.errors);
		if (response.data) showSuccessNotificationAndCloseModal();
	}

	function showSuccessNotificationAndCloseModal() {
		showSuccessNotification('Sign in successfully');
		onClose();
		resetForm();
	}

	return (
		<Modal active={active} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={handleChange}
					value={values.alias}
					name="alias"
					id="alias"
					placeholder="Alias"
					required
					minLength={3}
					maxLength={10}
				/>
				<input
					type="email"
					onChange={handleChange}
					value={values.email}
					name="email"
					id="email"
					placeholder="Email"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={handleChange}
					value={values.password}
					name="password"
					id="password"
					required
					minLength={6}
				/>
				<button disabled={isSubmitting} type="submit">
					Sign In
				</button>
			</form>
		</Modal>
	);
}
