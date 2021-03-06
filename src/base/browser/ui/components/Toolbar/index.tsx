import React from 'react';
import useAuth from 'src/base/browser/lib/hooks/useAuth';
import AuthModal from 'src/base/browser/ui/components/AuthModal';
import { Header, Title } from './styles';

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
		<Header>
			<Title href="/">Foruma</Title>
			{authUser ? (
				<>
					<div>{authUser.alias}</div>
					<button onClick={signOutUser}>Logout</button>
				</>
			) : (
				<button onClick={showAuthModal}>Sign In</button>
			)}
			{children}
			<AuthModal active={isAuthVisible} onClose={closeModal} />
		</Header>
	);
}
