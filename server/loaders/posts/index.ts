import { IDataSources } from 'server/dataSource/types';
import { Document } from 'mongoose';
import { IPostsDataLoader } from './types';
import DataLoader from 'dataloader';
import { IDBPost } from 'server/models/post/types';

export default class PostsDataLoader implements IPostsDataLoader {
	public getPosts: DataLoader<unknown, IDBPost & Document<any, any, IDBPost>>;
	public getPostById: DataLoader<string, (IDBPost & Document<any, any, IDBPost>) | null>;

	constructor(dataSources: IDataSources) {
		this.getPosts = new DataLoader<unknown, IDBPost & Document<any, any, IDBPost>>(() => {
			return dataSources.posts.getPosts();
		});

		this.getPostById = new DataLoader<string, (IDBPost & Document<any, any, IDBPost>) | null>(
			async (ids: readonly string[]) => {
				const posts = await dataSources.posts.getPosts(ids);
				return ids.map((id) => posts.find((post) => post.id === id) ?? null);
			}
		);
	}
}
