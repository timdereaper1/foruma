import Comment from 'app/modules/viewPost/components/Comment';
import { GetPostQuery } from 'app/graphql';

interface ICommentsListProps {
	comments: GetPostQuery['getPost']['comments'];
}

export default function CommentsList({ comments }: ICommentsListProps) {
	return (
		<section>
			<h2>Comments</h2>
			{comments.map((comment) => (
				<Comment key={comment?.id} comment={comment} />
			))}
		</section>
	);
}
