import React from 'react';
import { IconWrapper } from './styles';

export interface IconProps {
	iconName: string;
	className?: string;
}

export default function Icon({ iconName, className = '' }: IconProps) {
	return <IconWrapper className={`fas fa-${iconName} ${className}`}></IconWrapper>;
}
