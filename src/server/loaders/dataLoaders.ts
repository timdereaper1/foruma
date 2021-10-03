import { IDataSources } from 'src/server/dataSource/dataSources';
import CommentsDataLoader, { ICommentsDataLoader } from './commentsDataLoader';
import PostsDataLoader, { IPostsDataLoader } from './postsDataLoader';
import UserDataLoader, { IUserDataLoader } from './usersDataLoader';

export interface IDataLoaders {
	posts: IPostsDataLoader;
	comments: ICommentsDataLoader;
	users: IUserDataLoader;
}

export default class DataLoaders implements IDataLoaders {
	public posts: IPostsDataLoader;
	public comments: ICommentsDataLoader;
	public users: IUserDataLoader;

	constructor(dataSources: IDataSources) {
		this.posts = new PostsDataLoader(dataSources);
		this.comments = new CommentsDataLoader(dataSources);
		this.users = new UserDataLoader(dataSources);
	}
}
