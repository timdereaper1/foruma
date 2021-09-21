import React from 'react';
import useAuth from 'src/common/hooks/useAuth';
import AuthModal from 'src/common/components/AuthModal';
import styled from 'styled-components';

interface ToolbarProps {}

export default function Toolbar({ children }: React.PropsWithChildren<ToolbarProps>) {
	const [isAuthVisible, setAuthVisible] = React.useState(false);
	const { authUser, signOutUser } = useAuth();

	function closeModal() {
		setAuthVisible(false);
	}

	function showAuthModal() {
		setAuthVisible(true);
	}

	return (
		<>
			<Header>
				<Title>Public forum</Title>
				{authUser ? (
					<>
						<div>{authUser.alias}</div>
						<button onClick={signOutUser}>Logout</button>
					</>
				) : (
					<button onClick={showAuthModal}>Sign In</button>
				)}
				{children}
			</Header>
			<AuthModal active={isAuthVisible} onClose={closeModal} />
		</>
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
