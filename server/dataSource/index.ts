import CommentsDataSource from './comments';
import { ICommentsDataSource } from './comments/types';
import PostsDataSource from './posts';
import { IPostsDataSource } from './posts/types';
import { IDataSources } from './types';
import UsersDataSource from './users';
import { IUsersDataSource } from './users/types';

export default class DataSource implements IDataSources {
	public comments: ICommentsDataSource;
	public posts: IPostsDataSource;
	public users: IUsersDataSource;

	constructor() {
		this.comments = new CommentsDataSource();
		this.posts = new PostsDataSource();
		this.users = new UsersDataSource();
	}
}
