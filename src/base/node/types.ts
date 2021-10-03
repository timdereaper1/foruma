import { IDataSources } from 'src/server/dataSource/dataSources';
import { IDataLoaders } from 'src/server/loaders/dataLoaders';

export interface IGraphQLContext {
	dataSources: IDataSources;
	loaders: IDataLoaders;
	userId: string | null;
}
