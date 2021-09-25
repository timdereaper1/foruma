import DataLoader from 'dataloader';
import { Document } from 'mongoose';
import { IDBComment } from 'server/models/comment/types';

export interface ICommentsDataLoader {
	getComments: DataLoader<string, (IDBComment & Document<any, any, IDBComment>)[]>;
}
