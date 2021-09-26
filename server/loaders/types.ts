import { ICommentsDataLoader } from './comments/types';
import { IPostsDataLoader } from './posts/types';
import { IUserDataLoader } from './users/types';

export interface IDataLoaders {
	posts: IPostsDataLoader;
	comments: ICommentsDataLoader;
	users: IUserDataLoader;
}
