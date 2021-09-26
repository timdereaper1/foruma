export interface IUserPost {
	userId: string;
	post: string;
	id: string;
}

export interface IAuthenticatedUser {
	alias: string;
	userId: string;
	createdAt: unknown;
}

export interface IApiRequestResponse<T = unknown> {
	data?: T;
	success?: boolean;
	error?: string;
}
