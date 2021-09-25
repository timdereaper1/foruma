import CommentsDataSource from './comments';
import { ICommentsDataSource } from './comments/types';
import PostsDataSource from './posts';
import { IPostsDataSource } from './posts/types';
import { IDataSources } from './types';

export default class DataSource implements IDataSources {
	public comments: ICommentsDataSource;
	public posts: IPostsDataSource;

	constructor() {
		this.comments = new CommentsDataSource();
		this.posts = new PostsDataSource();
	}
}
