import { IDataSources } from './dataSource/types';
import { IDataLoaders } from './loaders/types';

export interface IGraphQLContext {
	dataSources: IDataSources;
	loaders: IDataLoaders;
	userId: string | null;
}
