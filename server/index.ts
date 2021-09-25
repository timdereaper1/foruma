import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { PORT } from 'server/utils/constants';
import resolvers from 'server/resolvers';
import { getMongoDBConnection } from './db/connection';
import DataSource from './dataSource';
import DataLoaders from './loaders';
import { getAuthUserId } from './utils/tokens';

async function main() {
	await getMongoDBConnection();
	const typeDefs = importSchema('./schema.graphql');
	const dataSources = new DataSource();
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		dataSources: () => dataSources as any,
		context: ({ req }) => ({
			loaders: new DataLoaders(dataSources),
			userId: getAuthUserId(req),
		}),
	});
	await server.start();
	const app = express();
	server.applyMiddleware({ app });
	app.listen(PORT, () => {
		console.log(`Server ready at  http://localhost:${PORT}${server.graphqlPath}`);
	});
}

main().catch((reason) => {
	console.error(reason);
	process.exit(1);
});
