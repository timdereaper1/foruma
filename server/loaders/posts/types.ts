import DataLoader from 'dataloader';
import { Document } from 'mongoose';
import { IDBPost } from 'server/models/post/types';

export interface IPostsDataLoader {
	getPosts: DataLoader<unknown, IDBPost & Document<any, any, IDBPost>>;
	getPostById: DataLoader<string, (IDBPost & Document<any, any, IDBPost>) | null>;
}
