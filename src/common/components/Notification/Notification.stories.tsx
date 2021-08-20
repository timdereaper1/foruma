import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { NotificationContext } from '../../contexts/NotificationProvider';
import Notification from './Notification';

export default {
	title: 'Components/Notification',
	component: Notification,
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args: any) => (
	<NotificationContext.Provider
		value={{
			dismissNotification: () => {},
			showNotification: () => {},
			notification: args,
		}}
	>
		<Notification />
	</NotificationContext.Provider>
);

export const Error = Template.bind({});
Error.args = {
	type: 'error',
	message: 'This is an error notification',
};

export const Success = Template.bind({});
Success.args = {
	type: 'success',
	message: 'This is a success notification',
};
