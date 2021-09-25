import { ICommentsDataSource } from './comments/types';
import { IPostsDataSource } from './posts/types';

export interface IDataSources {
	comments: ICommentsDataSource;
	posts: IPostsDataSource;
}
