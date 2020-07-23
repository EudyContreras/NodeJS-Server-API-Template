export default class RedisCacheHandler {
	public available(): boolean {
		return false;
	}

	public async saveValues(key: string, value: any): Promise<{ result?: boolean; error?: any }> {
		return new Promise(() => {});
	}
}
