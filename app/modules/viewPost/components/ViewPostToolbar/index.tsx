import { GetPostQuery } from 'app/graphql';

interface IViewPostPostToolbarProps {
	post?: GetPostQuery['getPost'];
}

export default function ViewPostPageToolbar({}: IViewPostPostToolbarProps) {
	return <></>;
}
