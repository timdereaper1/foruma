import CommentFieldResolver from './comments';
import Mutations from './mutations';
import PostFieldResolver from './posts';
import UserResolver from './users';
import Queries from './queries';

const resolvers = {
	Query: Queries,
	Mutation: Mutations,
	Post: PostFieldResolver,
	Comment: CommentFieldResolver,
	User: UserResolver,
};

export default resolvers;
