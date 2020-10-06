import { openDB, IDBPDatabase } from 'idb';

const READ_WRITE = 'readwrite';

export const storage = {
	NAME: 'Client data storage',
	DESCRIPTION: 'Templagte Engine Cache Handling Storage'
};

const structure = {
	DB_NAME: storage.NAME,
	STORE_NAME: 'keyval',
	methods: {
		READ_WRITE: READ_WRITE
	}
};

const database = (): Promise<IDBPDatabase<unknown>> | undefined => {
	if (__CLIENT_RENDERED__) {
		return openDB(structure.DB_NAME, 1, {
			upgrade(database) {
				const storeMame = structure.STORE_NAME;
				database.createObjectStore(storeMame);
			}
		});
	}
	return undefined;
};

interface KeyVal {
	getItem(key: string): Promise<any | null | undefined>;
	setItem(key: string, value: any): Promise<IDBValidKey | null>;
	deleteItem(key: string): Promise<void>;
	clearItems(): Promise<void>;
}

const idbInstance = (database: Promise<IDBPDatabase<unknown>> | undefined): KeyVal => ({
	async getItem(key: string): Promise<any | null | undefined> {
		return database && (await database).get(structure.STORE_NAME, key);
	},
	async setItem(key: string, value: any): Promise<IDBValidKey | any> {
		return database && (await database).put(structure.STORE_NAME, value, key);
	},
	async deleteItem(key: string): Promise<void> {
		return database && (await database).delete(structure.STORE_NAME, key);
	},
	async clearItems(): Promise<void> {
		return database && (await database).clear(structure.STORE_NAME);
	}
});

export const IndexDB = idbInstance(database());
