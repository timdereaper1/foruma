export interface Post {
	userId: string;
	post: string;
	id: string;
}

export interface User {
	alias: string;
	userId: string;
	createdAt: unknown;
}
