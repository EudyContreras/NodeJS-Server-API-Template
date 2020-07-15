import localforage from 'localforage';
import { storage } from '../constants';
import { CacheQuotaOptions } from '../commons';

const instance = localforage.createInstance({
	driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
	description: storage.NAME,
	name: storage.DESCRIPTION
});

export interface CacheEntryInfo {
	id: string;
	url: string;
	cacheName: string;
    expiryDate: number | null;
    clearOnError: boolean;
	visitFrequency: number;
}

export interface UpdateEntryArgs {
    clearOnError: boolean | null | undefined;
    expiryDate: number | null | undefined;
    visited: boolean | undefined;
}

export interface Entry {
    [key: string]: CacheEntryInfo;
}

export const defaultEntry = (url, cacheName, expiryDate = null, visitFrequency = 0, clearOnError = true): CacheEntryInfo => {
	return {
		id: `${url}|${cacheName}`,
		url: url,
		cacheName: cacheName,
		expiryDate: expiryDate,
		clearOnError: clearOnError,
		visitFrequency: visitFrequency ?? 0
	};
};

export function getEntry(key: string): Promise<CacheEntryInfo> {
	return instance.getItem(key);
}

export async function getAllEntries(cacheName: string): Promise<CacheEntryInfo[]> {
	return instance.keys().then(async (keys) => {
		const cacheKeys = keys.filter(x => x == cacheName);
		const entries: CacheEntryInfo[] = [];
		for (const key of cacheKeys) {
			const cacheItem = await instance.getItem(key);
			entries[key] = cacheItem;
		}
		return entries;
	});
}

export async function updateEntry(key: string, cacheName: string, { clearOnError = null, expiryDate = null, visited = false }: UpdateEntryArgs): Promise<CacheEntryInfo> {	
	try {
		const entry: CacheEntryInfo = await instance.getItem<CacheEntryInfo>(key);

		const frequency = visited ? (entry.visitFrequency ?? 0) + 1 : (entry.visitFrequency ?? 0);
		const updatedEntry: CacheEntryInfo = {
			...entry,
			visitFrequency: frequency,
			clearOnError: clearOnError ?? entry.clearOnError ?? false,
			expiryDate: expiryDate ?? entry.expiryDate ?? null
		};

		return await instance.setItem(key, updatedEntry);
	} catch(error) {
		return await instance.setItem(key, defaultEntry(key, cacheName));
	}
}

export async function hasExpired(key: string, cacheName: string): Promise<boolean>{
	try {
		const entry: CacheEntryInfo = await instance.getItem<CacheEntryInfo>(key);
		return entry.expiryDate ? Date.now() > entry.expiryDate : false;
	} catch(error) {
		return false;
	}
}

export async function attachExpiration(key: string, cacheName: string, quotaOptions?: CacheQuotaOptions): Promise<CacheEntryInfo> {
	const expires = new Date();
	let attacheExpiration = false;
	if (quotaOptions) {
		if (quotaOptions.maxAgeSeconds > 0) {
			expires.setSeconds(expires.getSeconds() + quotaOptions.maxAgeSeconds);	
			attacheExpiration = true;
		}
	}
	return updateEntry(key, cacheName, {
		visited: true,
		clearOnError: quotaOptions?.clearOnError,
		expiryDate: attacheExpiration ? expires.getSeconds() : null
	});
}

export async function setEntryClearOnError(key: string, cacheName: string, clearOnError: boolean): Promise<CacheEntryInfo> {
	try {
		const entry: CacheEntryInfo = await instance.getItem<CacheEntryInfo>(key);
		const updatedEntry: CacheEntryInfo = {
			...entry ?? defaultEntry,
			clearOnError: clearOnError
		};
		return await instance.setItem(key, updatedEntry);
	} catch(error) {
		return await instance.setItem(key, defaultEntry(key, cacheName));
	}
}

export async function setEntryExpiryDate(key: string, cacheName: string, expiryDate: number): Promise<CacheEntryInfo> {
	try {
		const entry: CacheEntryInfo = await instance.getItem<CacheEntryInfo>(key);
		const updatedEntry: CacheEntryInfo = {
			...entry ?? defaultEntry,
			expiryDate: expiryDate
		};
		return await instance.setItem(key, updatedEntry);
	} catch(error) {
		return await instance.setItem(key, defaultEntry(key, cacheName));
	}
}

export async function increaseVisitFrequency(key: string, cacheName: string): Promise<CacheEntryInfo> {
	try {
		const entry: CacheEntryInfo = await instance.getItem<CacheEntryInfo>(key);
		const updatedEntry: CacheEntryInfo = {
			...entry ?? defaultEntry,
			visitFrequency: entry.visitFrequency + 1
		};
		return await instance.setItem(key, updatedEntry);
	} catch(error) {
		return await instance.setItem(key, defaultEntry(key, cacheName));
	}
}

