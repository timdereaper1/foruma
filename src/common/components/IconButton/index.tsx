import React from 'react';
import Icon from '../Icon';
import { StyledButton } from './styles';

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
