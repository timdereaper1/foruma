import CommentFieldResolver from './resolvers/fieldResolvers/comments';
import Mutations from './resolvers/mutations';
import PostFieldResolver from './resolvers/fieldResolvers/posts';
import UserResolver from './resolvers/fieldResolvers/users';
import Queries from './resolvers/queries';

const resolvers = {
	Query: Queries,
	Mutation: Mutations,
	Post: PostFieldResolver,
	Comment: CommentFieldResolver,
	User: UserResolver,
};

export default resolvers;
