import Comment from 'src/platform/viewPost/browser/ui/components/Comment';
import { GetPostQuery } from 'src/graphql';

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
