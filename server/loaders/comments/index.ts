import { ICommentsDataLoader } from './types';
import DataLoader from 'dataloader';
import { Document } from 'mongoose';
import { IDBComment } from 'server/models/comment/types';
import { IDataSources } from 'server/dataSource/types';

export default class CommentsDataLoader implements ICommentsDataLoader {
	public getComments: DataLoader<string, (IDBComment & Document<any, any, IDBComment>)[]>;
	public getUserComments: DataLoader<string, (IDBComment & Document<any, any, IDBComment>)[]>;

	constructor(dataSources: IDataSources) {
		this.getComments = new DataLoader<string, (IDBComment & Document<any, any, IDBComment>)[]>(
			async (ids: readonly string[]) => {
				const comments = await dataSources.comments.getComments(ids);
				return ids.map((id) => comments.filter((comment) => comment.postId === id));
			}
		);

		this.getUserComments = new DataLoader<
			string,
			(IDBComment & Document<any, any, IDBComment>)[]
		>(async (ids: readonly string[]) => {
			const comments = await dataSources.comments.getUsersComments(ids);
			return ids.map((id) => comments.filter((comment) => comment.userId === id));
		});
	}
}
