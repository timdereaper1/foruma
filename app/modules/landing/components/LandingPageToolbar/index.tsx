import React from 'react';
import Toolbar from 'app/common/components/Toolbar';
import Icon from 'app/common/components/Icon';
import useAuth from 'app/common/hooks/useAuth';
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
