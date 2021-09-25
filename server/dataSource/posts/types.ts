import { Document } from 'mongoose';
import { IDBPost } from 'server/models/post/types';

export interface IAddNewDBPost {
	body: string;
	userId: string;
}

export interface IPostsDataSource {
	getPosts(ids?: readonly string[]): Promise<(IDBPost & Document<any, any, IDBPost>)[]>;
	getPostById(postId: string): Promise<(IDBPost & Document<any, any, IDBPost>) | null>;
	addPost(args: IAddNewDBPost): Promise<IDBPost & Document<any, any, IDBPost>>;
	getPostsByUser(userIds: readonly string[]): Promise<(IDBPost & Document<any, any, IDBPost>)[]>;
}
