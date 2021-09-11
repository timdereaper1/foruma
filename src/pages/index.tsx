import Link from 'next/link';
import React from 'react';
import AddPost from 'src/features/Home/AddPost';
import AuthModal from 'src/features/Home/AuthModal';
import styled from 'styled-components';
import { useNotification } from 'src/common/contexts/NotificationProvider';
import firebase from 'src/common/firebase/firebaseApp';
import { Post } from 'src/common/types';
import useAuth from 'src/common/hooks/useAuth';

function Index() {
	const [activeModal, setActiveModalTo] = React.useState<'none' | 'post-modal' | 'auth-modal'>(
		'none'
	);
	const [posts, setPosts] = React.useState<Post[]>([]);
	const { showErrorNotification } = useNotification();
	const { authUser, signOutUser } = useAuth();

	const isPostsAvailable = Boolean(posts.length);

	React.useEffect(() => {
		firebase
			.firestore()
			.collection('posts')
			.orderBy('createdAt', 'desc')
			.get()
			.then((snapshot) => {
				const newPosts: Post[] = [];
				snapshot.forEach((doc) => {
					const post: Post = { ...(doc.data() as any), id: doc.id };
					newPosts.push(post);
				});
				setPosts(newPosts);
			})
			.catch(() => {
				showErrorNotification(
					'Cannot retrieve posts. Ensure you have network availability'
				);
			});
	}, []);

	React.useEffect(() => {
		if (!isPostsAvailable) return;
		const unsubscribe = firebase
			.firestore()
			.collection('posts')
			.onSnapshot((snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === 'added') {
						const newPost = { ...(change.doc.data() as Post), id: change.doc.id };
						setPosts((posts) => {
							const ids = posts.map((post) => post.id);
							return ids.includes(newPost.id)
								? posts
								: ([] as Post[]).concat([newPost, ...posts]);
						});
					}
				});
			});
		return () => unsubscribe();
	}, [isPostsAvailable]);

	function closeModal() {
		setActiveModalTo('none');
	}

	return (
		<div>
			<Header>
				<Title>Public forum</Title>
				{authUser ? (
					<>
						<div>{authUser.alias}</div>
						<button onClick={signOutUser}>Logout</button>
					</>
				) : (
					<button onClick={() => setActiveModalTo('auth-modal')}>Sign In</button>
				)}
				{!authUser ? null : (
					<PostBtn onClick={() => setActiveModalTo('post-modal')}>
						<i className="fas fa-plus"></i>
					</PostBtn>
				)}
			</Header>
			<Posts>
				{posts.map((post) => (
					<Link key={post.id} href={`/posts/${post.id}`}>
						<PostItem>
							<PostContent>{post.post}</PostContent>
							<PostAlias>{post.userId}</PostAlias>
						</PostItem>
					</Link>
				))}
			</Posts>
			<AddPost onClose={closeModal} active={activeModal === 'post-modal'} />
			<AuthModal active={activeModal === 'auth-modal'} onClose={closeModal} />
		</div>
	);
}

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #45086e;
	color: white;
	padding: 1rem 2rem;
`;

const Title = styled.h1`
	margin: 0;
	font-size: 1.2rem;
`;

const PostBtn = styled.button`
	outline: none;
	border: none;
	background: none;
	color: inherit;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	font-size: 1.12rem;
	cursor: pointer;
	&:hover {
		background: #5e158f;
	}
`;

const Posts = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	gap: 2rem;
	padding: 2rem;
`;

const PostItem = styled.a`
	display: block;
	text-decoration: none;
	background: #ffffff;
	padding: 1rem;
	border-radius: 8px;
	cursor: pointer;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	&:hover {
		box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
	}
`;

const PostAlias = styled.small``;

const PostContent = styled.p`
	margin: 0 0 0.75rem;
`;

export default Index;
