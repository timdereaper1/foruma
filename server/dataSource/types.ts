import { ICommentsDataSource } from './comments/types';
import { IPostsDataSource } from './posts/types';
import { IUsersDataSource } from './users/types';

export interface IDataSources {
	comments: ICommentsDataSource;
	posts: IPostsDataSource;
	users: IUsersDataSource;
}
