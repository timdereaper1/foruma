import { Maybe } from 'src/graphql';

export interface IAuthenticatedUser {
	alias: string;
	email: string;
	totalPosts: number;
	totalComments: number;
	createdAt?: Maybe<string> | undefined;
	updatedAt?: Maybe<string> | undefined;
	token: string;
}

export interface IApiRequestResponse<T = unknown> {
	data?: T;
	success?: boolean;
	error?: string;
}
