import { ICommentsDataLoader } from './comments/types';
import { IPostsDataLoader } from './posts/types';

export interface IDataLoaders {
	posts: IPostsDataLoader;
	comments: ICommentsDataLoader;
}
