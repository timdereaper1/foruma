const BrowserStorage = {
	setItem<T>(key: string, data: T) {
		const encodedData = typeof data === 'string' ? data : JSON.stringify(data);
		if (typeof window === 'undefined') return;
		window.localStorage.setItem(key, encodedData);
	},
	removeItem(key: string) {
		if (typeof window === 'undefined') return;
		window.localStorage.removeItem(key);
	},
	getItem<T>(key: string): T | null {
		if (typeof window === 'undefined') return null;
		const storedData = window.localStorage.getItem(key);
		try {
			return storedData ? JSON.parse(storedData) : null;
		} catch (error) {
			const res = (error as Error).name === 'SyntaxError' ? storedData : null;
			return res as any;
		}
	},
};

export default BrowserStorage;
