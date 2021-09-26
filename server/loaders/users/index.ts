import { IUserDataLoader } from './types';
import { IDBUser } from 'server/models/user/types';
import { Document } from 'mongoose';
import DataLoader from 'dataloader';
import { IDataSources } from 'server/dataSource/types';

export default class UserDataLoader implements IUserDataLoader {
	public getUser: DataLoader<string, (IDBUser & Document<any, any, IDBUser>) | null>;

	constructor(dataSources: IDataSources) {
		this.getUser = new DataLoader<string, (IDBUser & Document<any, any, IDBUser>) | null>(
			async (ids: readonly string[]) => {
				const users = await dataSources.users.getUsers(ids);
				return ids.map((id) => users.find((user) => user.id === id) ?? null);
			}
		);
	}
}
