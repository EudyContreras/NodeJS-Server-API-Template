
import { storage } from '../constants';
import { openDB, DBSchema } from 'idb';
import { logger } from '../commons';

const READ_WRITE = 'readwrite';
const READ_ONLY = 'readonly';

const indexes = {
	ENTRY_ID: 'by-id',
	ENTRY_URL: 'by-url',
	CACHE_NAME: 'by-cachename'
};
const structure = {
	DB_NAME: storage.NAME,
	STORE_NAME: 'expiration',
	methods: {
		READ_WRITE: READ_WRITE
	},
	keyPaths: {
		PRIMARY_KEY: { index: indexes.ENTRY_ID, target: 'id' },
		KEYS: [
			{ index: indexes.ENTRY_URL, target:'url' },
			{ index: indexes.CACHE_NAME, target:'cacheName' }
		]
	}
};

interface CacheEntrySchema extends DBSchema {
	cacheEntry: {
		key: string;
		value: CacheEntryInfo;
	};
}

const database = openDB(structure.DB_NAME, 1, {
	upgrade(database) {
		const storeMame = structure.STORE_NAME;
		const primaryKey = structure.keyPaths.PRIMARY_KEY;
		const indexKeys = structure.keyPaths.KEYS;
	
		const objectStore = database.createObjectStore(storeMame);
	
		objectStore.createIndex(primaryKey.index, primaryKey.target, { unique: true });
		
		indexKeys.forEach(element => {
			objectStore.createIndex(element.index, element.target, { unique: false });
		});
	}
});
   
const instance = {
	async getAllItems(query: { index: string; key: string }): Promise<CacheEntryInfo[]> {
		const transaction = (await database).transaction(structure.STORE_NAME, READ_ONLY).store;
		const index = await transaction.index(query.index);
		return index.getAll(query.key);
	},
	async getEntryCount(query: { index: string; key: string }): Promise<number> {
		const transaction = (await database).transaction(structure.STORE_NAME, READ_ONLY).store;
		const index = await transaction.index(query.index);
		return index.count(query.key);
	},
	async clearEntries(query: { index: string; key: string }): Promise<void> {
		const transaction = (await database).transaction(structure.STORE_NAME, READ_WRITE).store;
		const index = await transaction.index(query.index);
		const items: CacheEntryInfo[] = await index.getAll(query.key);
		return items.forEach(item => {
			if (!item.persist) {
				transaction.delete(item.id);
			}
		});
	},
	async getItem(key): Promise<CacheEntryInfo | undefined> {
		return (await database).get(structure.STORE_NAME, key);
	},
	async setItem(key, value): Promise<IDBValidKey> {
		return (await database).put(structure.STORE_NAME, value, key);
	},
	async deleteItem(key): Promise<void> {
		return (await database).delete(structure.STORE_NAME, key);
	},
	async clearItems(): Promise<void> {
		return (await database).clear(structure.STORE_NAME);
	},
	async keys(): Promise<IDBValidKey[]> {
		return (await database).getAllKeys(structure.STORE_NAME);
	}
};

export const defaultEntry = (url, cacheName, expiryDate = null, visitFrequency = 0, clearOnError = true): CacheEntryInfo => {
	return {
		id: `${cacheName}|${url}`,
		url: url,
		persist: false,
		cacheName: cacheName,
		expiryDate: expiryDate,
		clearOnError: clearOnError,
		visitFrequency: visitFrequency ?? 0
	};
};

export async function getEntry(key: string): Promise<CacheEntryInfo | undefined> {
	return await instance.getItem(key);
}

export async function clearEntries(cacheName: string): Promise<void> {
	return await instance.clearEntries({
		index: indexes.CACHE_NAME,
		key: cacheName
	});
}

export async function getEntryCount(cacheName: string): Promise<number> {
	return await instance.getEntryCount({
		index: indexes.CACHE_NAME,
		key: cacheName
	});
}

export async function getAllEntries(cacheName: string): Promise<CacheEntryInfo[]> {
	return await instance.getAllItems({
		index: indexes.CACHE_NAME,
		key: cacheName
	});
}

export async function updateEntry(key: string, cacheName: string, { clearOnError = null, expiryDate = null, visited = false, persist = false }: UpdateEntryArgs): Promise<void> {	
	try {
		const item = await instance.getItem(key);
		const entry = item ? item : defaultEntry(key, cacheName);
		
		const frequency = visited ? (entry.visitFrequency ?? 0) + 1 : (entry.visitFrequency ?? 0);
		const updatedEntry: CacheEntryInfo = {
			...entry,
			visitFrequency: frequency,
			clearOnError: clearOnError ?? entry.clearOnError ?? false,
			expiryDate: expiryDate ?? entry.expiryDate ?? null
		};
		await instance.setItem(key, updatedEntry);
	} catch(error) {
		logger.error('Something went wrong', error);
	}
}

export async function hasExpired(key: string): Promise<boolean>{
	try {
		const entry = await instance.getItem(key);
		return entry ? entry.expiryDate ? Date.now() > entry.expiryDate: false : true;
	} catch(error) {
		logger.error('Something went wrong', error);
		return true;
	}
}

export async function attachExpiration(key: string, cacheName: string, quotaOptions?: CacheQuotaOptions): Promise<void> {
	const expires = new Date();
	let attacheExpiration = false;
	if (quotaOptions) {
		if (quotaOptions.maxAgeSeconds > 0) {
			expires.setSeconds(expires.getSeconds() + quotaOptions.maxAgeSeconds);	
			attacheExpiration = true;
		}
	}
	return await updateEntry(key, cacheName, {
		visited: true,
		persist: false,
		clearOnError: quotaOptions?.clearOnError,
		expiryDate: attacheExpiration ? expires.getTime() : null
	});
}

