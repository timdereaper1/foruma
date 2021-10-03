import React from 'react';
import Toolbar from 'src/base/browser/ui/components/Toolbar';
import Icon from 'src/base/browser/ui/components/Icon';
import useAuth from 'src/base/browser/lib/hooks/useAuth';
import { PostBtn } from './styles';
import AddPost from '../AddPostModal';

export default function LandingPageToolbar() {
	const [isAddPostModalVisible, setAddPostModalVisibility] = React.useState(false);
	const { authUser } = useAuth();

	function closeModal() {
		setAddPostModalVisibility(false);
	}

	function showAddPostModal() {
		setAddPostModalVisibility(true);
	}
	return (
		<>
			<Toolbar>
				{!authUser ? null : (
					<PostBtn onClick={showAddPostModal}>
						<Icon iconName="plus" />
					</PostBtn>
				)}
			</Toolbar>
			<AddPost active={isAddPostModalVisible} onClose={closeModal} />
		</>
	);
}
