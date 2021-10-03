import PostsDataSource, { IPostsDataSource } from './postsDataSource';
import UsersDataSource, { IUsersDataSource } from './usersDataSource';
import CommentsDataSource, { ICommentsDataSource } from './commentsDataSource';

export interface IDataSources {
	comments: ICommentsDataSource;
	posts: IPostsDataSource;
	users: IUsersDataSource;
}

export default class DataSources implements IDataSources {
	public comments: ICommentsDataSource;
	public posts: IPostsDataSource;
	public users: IUsersDataSource;

	constructor() {
		this.comments = new CommentsDataSource();
		this.posts = new PostsDataSource();
		this.users = new UsersDataSource();
	}
}
