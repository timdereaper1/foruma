import { Document } from 'mongoose';
import DataLoader from 'dataloader';
import { IDBPost } from 'src/base/node/db/models/post';
import { IDataSources } from 'src/server/dataSource/dataSources';

export interface IPostsDataLoader {
	getPosts: DataLoader<unknown, IDBPost & Document<any, any, IDBPost>>;
	getPostById: DataLoader<string, (IDBPost & Document<any, any, IDBPost>) | null>;
	getUserPosts: DataLoader<string, (IDBPost & Document<any, any, IDBPost>)[]>;
}

export default class PostsDataLoader implements IPostsDataLoader {
	public getPosts: DataLoader<unknown, IDBPost & Document<any, any, IDBPost>>;
	public getPostById: DataLoader<string, (IDBPost & Document<any, any, IDBPost>) | null>;
	public getUserPosts: DataLoader<string, (IDBPost & Document<any, any, IDBPost>)[]>;

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

		this.getUserPosts = new DataLoader<string, (IDBPost & Document<any, any, IDBPost>)[]>(
			async (ids: readonly string[]) => {
				const posts = await dataSources.posts.getPostsByUser(ids);
				return ids.map((id) => posts.filter((post) => post.userId === id));
			}
		);
	}
}
