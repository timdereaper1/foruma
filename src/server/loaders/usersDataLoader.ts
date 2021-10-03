import { Document } from 'mongoose';
import DataLoader from 'dataloader';
import { IDBUser } from 'src/base/node/db/models/user';
import { IDataSources } from 'src/server/dataSource/dataSources';

export interface IUserDataLoader {
	getUser: DataLoader<string, (IDBUser & Document<any, any, IDBUser>) | null>;
}

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
