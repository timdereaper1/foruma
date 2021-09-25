import { IDataSources } from 'server/dataSource/types';
import CommentsDataLoader from './comments';
import { ICommentsDataLoader } from './comments/types';
import PostsDataLoader from './posts';
import { IPostsDataLoader } from './posts/types';
import { IDataLoaders } from './types';

export default class DataLoaders implements IDataLoaders {
	public posts: IPostsDataLoader;
	public comments: ICommentsDataLoader;

	constructor(dataSources: IDataSources) {
		this.posts = new PostsDataLoader(dataSources);
		this.comments = new CommentsDataLoader(dataSources);
	}
}
