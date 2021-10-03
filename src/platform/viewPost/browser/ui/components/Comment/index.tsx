import { GetPostQuery } from 'src/graphql';

interface ICommentProps {
	comment?: GetPostQuery['getPost']['comments'][0];
}

export default function Comment({ comment }: ICommentProps) {
	return (
		<div>
			<p>{comment?.body}</p>
			<small>{comment?.user.alias}</small>
		</div>
	);
}
