import { Document } from 'mongoose';
import { IDBComment } from 'server/models/comment/types';

export interface IAddNewDBComment {
	body: string;
	userId: string;
	postId: string;
}

export interface ICommentsDataSource {
	addComment(args: IAddNewDBComment): Promise<IDBComment & Document<any, any, IDBComment>>;
	getPostComments(id: string): Promise<(IDBComment & Document<any, any, IDBComment>)[]>;
	getComments(ids: readonly string[]): Promise<(IDBComment & Document<any, any, IDBComment>)[]>;
}
