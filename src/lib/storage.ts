export class LS {
	static set<T = any>(key: string, data: T) {
		const json = JSON.stringify(data);
		window.localStorage.setItem(key, json);
	}

	static get(key: string) {
		const json = window.localStorage.getItem(key);
		if (!json) return null;
		try {
			return JSON.parse(json);
		} catch {
			return null;
		}
	}

	static remove(key: string) {
		window.localStorage.removeItem(key);
	}

	static clear() {
		window.localStorage.clear();
	}
}
