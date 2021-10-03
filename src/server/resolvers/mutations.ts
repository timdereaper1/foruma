import { ForbiddenError } from 'apollo-server-errors';
import { IAddNewDBComment } from 'src/server/dataSource/commentsDataSource';
import { IAddNewDBPost } from 'src/server/dataSource/postsDataSource';
import { IAddDBUser } from 'src/server/dataSource/usersDataSource';
import { IGraphQLContext } from 'src/base/node/types';
import Errors from 'src/base/node/lib/errors';
import { createAuthToken } from 'src/base/node/lib/tokens';

class Mutations {
	public createNewPost(
		_parent: unknown,
		args: Record<'data', Omit<IAddNewDBPost, 'userId'>>,
		context: IGraphQLContext
	) {
		if (!context.userId) throw new ForbiddenError(Errors.Forbidden);
		return context.dataSources.posts.addPost({
			...args.data,
			userId: context.userId,
		});
	}

	public commentOnPost(
		_parent: unknown,
		args: Record<'data', Omit<IAddNewDBComment, 'userId'>>,
		context: IGraphQLContext
	) {
		if (!context.userId) throw new ForbiddenError(Errors.Forbidden);
		return context.dataSources.comments.addComment({
			...args.data,
			userId: context.userId,
		});
	}

	public async signInToAccount(
		_parent: unknown,
		args: Record<'data', IAddDBUser>,
		context: IGraphQLContext
	) {
		const user = await context.dataSources.users.verify(args.data);
		const authenticatedUser = !user ? await context.dataSources.users.addUser(args.data) : user;
		const token = createAuthToken(authenticatedUser.id);
		return { ...authenticatedUser.toJSON(), id: authenticatedUser.id, token };
	}
}

export default new Mutations();
