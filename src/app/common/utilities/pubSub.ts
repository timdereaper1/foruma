const PubSubEvents: Record<string, { id: string; handler: (...args: unknown[]) => void }[]> = {};

const PubSub = {
	subscribe(eventName: string, handler: (...args: any[]) => void): string {
		const id = Math.random().toString(36);
		PubSubEvents[eventName] = (PubSubEvents[eventName] ?? []).concat([{ id, handler }]);
		return id;
	},
	unsubscribe(eventName: string, handlerId: string): void {
		PubSubEvents[eventName] = (PubSubEvents[eventName] ?? []).filter(
			(subscriber) => subscriber.id !== handlerId
		);
	},
	emit(eventName: string, data?: unknown) {
		(PubSubEvents[eventName] ?? []).forEach((subscriber) => {
			subscriber.handler(data);
		});
	},
};

export default PubSub;
