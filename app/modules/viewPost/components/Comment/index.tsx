import { IPostComment } from 'app/modules/viewPost/types';

interface ICommentProps {
	comment: IPostComment;
}

export default function Comment({ comment }: ICommentProps) {
	return (
		<div key={comment.id}>
			<p>{comment.comment}</p>
			<small>{comment.userId}</small>
		</div>
	);
}
