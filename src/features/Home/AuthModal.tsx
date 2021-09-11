import Modal from 'src/common/components/Modal';
import { useFormik } from 'formik';
import firebase from 'src/common/firebase/firebaseApp';
import { useNotification } from 'src/common/contexts/NotificationProvider';

interface AuthModalProps {
	active: boolean;
	onClose(): void;
}

export default function AuthModal({ active, onClose }: AuthModalProps) {
	const { showSuccessNotification, showErrorNotification } = useNotification();
	const { handleChange, values, handleSubmit, resetForm } = useFormik({
		initialValues: {
			alias: '',
			email: '',
			password: '',
		},
		onSubmit: async () => {
			firebase
				.auth()
				.signInWithEmailAndPassword(values.email, values.password)
				.then(showSuccessNotificationAndCloseModal)
				.catch((error: firebase.FirebaseError) => {
					if (error.code === 'auth/user-not-found') {
						firebase
							.auth()
							.createUserWithEmailAndPassword(values.email, values.password)
							.then((userCredential) => {
								return firebase.firestore().collection('users').doc().set({
									userId: userCredential.user?.uid,
									alias: values.alias,
									createdAt: firebase.firestore.Timestamp.now(),
								});
							})
							.then(showSuccessNotificationAndCloseModal)
							.catch(() => {
								showErrorNotification('Sorry could not sign in');
							});
					} else showErrorNotification('Sorry could not sign in');
				});
		},
	});

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
				<button type="submit">Sign In</button>
			</form>
		</Modal>
	);
}
