import { IPostComment } from 'src/app/modules/viewPost/types';
import Comment from 'src/app/modules/viewPost/components/Comment';

interface ICommentsListProps {
	comments: IPostComment[];
}

export default function CommentsList({ comments }: ICommentsListProps) {
	return (
		<section>
			<h2>Comments</h2>
			{comments.map((comment) => (
				<Comment comment={comment} />
			))}
		</section>
	);
}
