import styled from 'styled-components';

export const PostItem = styled.a`
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

export const PostAlias = styled.small``;

export const PostContent = styled.p`
	margin: 0 0 0.75rem;
`;
