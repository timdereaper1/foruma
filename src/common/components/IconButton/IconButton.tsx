import styled from 'styled-components';
import Icon from '../Icon';

interface IconButtonProps {
	iconName: string;
	onClick: () => void;
}

export default function IconButton({ iconName, onClick }: IconButtonProps) {
	return (
		<StyledButton onClick={onClick}>
			<Icon iconName={iconName} />
		</StyledButton>
	);
}

const StyledButton = styled.button``;
