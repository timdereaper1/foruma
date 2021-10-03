import Link from 'next/link';
import styled from 'styled-components';

export const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #45086e;
	color: white;
	padding: 1rem 2rem;
`;

export const Title = styled(Link)`
	margin: 0;
	font-size: 1.2rem;
`;
