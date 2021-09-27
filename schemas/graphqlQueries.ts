import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
	mutation SignInToAccount($data: Login!) {
		signInToAccount(data: $data) {
			alias
			email
			totalPosts
			totalComments
			createdAt
			updatedAt
			token
		}
	}
`;

export const ADD_POST_MUTATION = gql`
	mutation CreateNewPost($data: AddPost!) {
		createNewPost(data: $data) {
			id
			body
			createdAt
			updatedAt
			totalComments
			user {
				alias
				email
				totalPosts
				totalComments
				createdAt
				updatedAt
			}
		}
	}
`;

export const ADD_COMMENT_MUTATION = gql`
	mutation CommentOnPost($data: AddComment!) {
		commentOnPost(data: $data) {
			id
			body
			createdAt
			updatedAt
			user {
				alias
				email
				totalPosts
				totalComments
				createdAt
				updatedAt
			}
		}
	}
`;

export const GET_TRENDING_POSTS = gql`
	query GetTrendingPosts {
		getTrendingPosts {
			id
			body
			createdAt
			updatedAt
			totalComments
			user {
				alias
				email
				totalPosts
				totalComments
				createdAt
				updatedAt
			}
		}
	}
`;

export const GET_POST = gql`
	query GetPost($data: GetPost!) {
		getPost(data: $data) {
			id
			body
			createdAt
			updatedAt
			totalComments
			user {
				alias
				email
				totalPosts
				totalComments
				createdAt
				updatedAt
			}
			comments {
				id
				body
				createdAt
				updatedAt
				user {
					alias
					email
					totalPosts
					totalComments
					createdAt
					updatedAt
				}
			}
		}
	}
`;
