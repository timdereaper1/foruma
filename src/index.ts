import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { PORT } from 'src/base/node/lib/constants';
import resolvers from 'src/server/graphqlResolvers';
import { getMongoDBConnection } from 'src/base/node/db/connection';
import DataSources from 'src/server/dataSource/dataSources';
import DataLoaders from 'src/server/loaders/dataLoaders';
import { getAuthUserId } from 'src/base/node/lib/tokens';

async function main() {
	await getMongoDBConnection();
	const typeDefs = importSchema('./src/schema.graphql');
	const dataSources = new DataSources();
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
