import Toolbar from 'src/common/components/Toolbar';
import { IUserPost } from 'src/common/types';

interface IViewPostPostToolbarProps {
	post: IUserPost | null;
}

export default function ViewPostPageToolbar({ post }: IViewPostPostToolbarProps) {
	return (
		<>
			<Toolbar>
				{!post ? null : (
					<header>
						<h1>{post.post}</h1>
						<h5>{post.userId}</h5>
					</header>
				)}
			</Toolbar>
		</>
	);
}
