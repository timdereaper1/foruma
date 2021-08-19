import { useRouter } from 'next/router';
import React from 'react';
import { useNotification } from '../../common/contexts/NotificationProvider';
import firebase from '../../common/firebase/firebaseApp';
import { Post } from '../../common/types';

interface Comment {
	id: string;
	comment: string;
	alias: string;
}

export default function PostTemplate() {
	const [post, setPost] = React.useState<Post | null>(null);
	const [comments, setComments] = React.useState<Comment[]>([]);
	const [values, setValues] = React.useState<Omit<Comment, 'id'>>({
		alias: '',
		comment: '',
	});
	const { showErrorNotification } = useNotification();
	const { query } = useRouter();
	const postId = query.id;
	const isPostAvailable = Boolean(postId);

	React.useEffect(() => {
		if (typeof postId !== 'string') return;
		firebase
			.firestore()
			.collection('posts')
			.doc(postId)
			.get()
			.then((snapshot) => {
				const post = snapshot.data() as Omit<Post, 'id'>;
				setPost({ ...post, id: snapshot.id });
			})
			.catch((reason) => {
				showErrorNotification(reason.message ?? 'Cannot get post');
			});
	}, [postId]);

	React.useEffect(() => {
		if (typeof postId !== 'string') return;
		firebase
			.firestore()
			.collection('posts')
			.doc(postId)
			.collection('comments')
			.orderBy('createdAt', 'desc')
			.get()
			.then((snapshot) => {
				const newPosts: Comment[] = [];
				snapshot.forEach((doc) => {
					const post: Comment = { ...(doc.data() as any), id: doc.id };
					newPosts.push(post);
				});
				setComments(newPosts);
			})
			.catch(() => {
				showErrorNotification(
					'Cannot retrieve comments. Ensure you have network availability'
				);
			});
	}, [postId]);

	React.useEffect(() => {
		if (typeof postId !== 'string') return;
		if (!isPostAvailable) return;
		const unsubscribe = firebase
			.firestore()
			.collection('posts')
			.doc(postId)
			.collection('comments')
			.onSnapshot((snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === 'added') {
						const newComment = { ...(change.doc.data() as Comment), id: change.doc.id };
						setComments((comments) => {
							const ids = comments.map((post) => post.id);
							return ids.includes(newComment.id)
								? comments
								: ([] as Comment[]).concat([newComment, ...comments]);
						});
					}
				});
			});
		return () => unsubscribe();
	}, [isPostAvailable, postId]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		try {
			if (typeof postId !== 'string') return;
			event.preventDefault();
			await firebase
				.firestore()
				.collection('posts')
				.doc(postId)
				.collection('comments')
				.doc()
				.set({ ...values, createdAt: firebase.firestore.Timestamp.now() });
			setValues((values) => ({ ...values, comment: '' }));
		} catch (error) {
			showErrorNotification('Cannot post message, please check your network');
		}
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setValues((prevValues) => ({
			...prevValues,
			[event.target.name]: event.target.value,
		}));
	}

	return (
		<div>
			<header>
				<h1>{post?.post}</h1>
				<h5>{post?.alias}</h5>
			</header>
			<section>
				<h2>Comments</h2>
				{comments.map((comment) => (
					<div key={comment.id}>
						<p>{comment.comment}</p>
						<small>{comment.alias}</small>
					</div>
				))}
			</section>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={handleChange}
					value={values.alias}
					name="alias"
					id="alias"
				/>
				<textarea
					name="comment"
					onChange={handleChange}
					value={values.comment}
					id="comment"
				></textarea>
				<button type="submit">Post</button>
			</form>
		</div>
	);
}
