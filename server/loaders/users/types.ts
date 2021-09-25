import DataLoader from 'dataloader';
import { Document } from 'mongoose';
import { IDBUser } from 'server/models/user/types';

export interface IUserDataLoader {
	getUser: DataLoader<string, (IDBUser & Document<any, any, IDBUser>) | null>;
}
