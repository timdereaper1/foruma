import styled from 'styled-components';

export interface IconProps {
	iconName: string;
	className?: string;
}

export default function Icon({ iconName, className = '' }: IconProps) {
	return <Wrapper className={`fas fa-${iconName} ${className}`}></Wrapper>;
}

const Wrapper = styled.i`
	font-size: 1rem;
`;
