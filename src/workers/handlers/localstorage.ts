import localforage from 'localforage';
import { storage } from '../constants';

const instance = localforage.createInstance({
	driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
	description: storage.NAME,
	name: storage.DESCRIPTION
});

export interface CacheEntryInfo {
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

export const defaultEntry = (expiryDate = null, visitFrequency = 0, clearOnError = true): CacheEntryInfo => {
	return {
		expiryDate: expiryDate,
		clearOnError: clearOnError,
		visitFrequency: visitFrequency ?? 0
	};
};

export function getEntry(key: string): Promise<CacheEntryInfo> {
	return instance.getItem(key);
}

export async function getAllEntries(): Promise<Entry[]> {
	return instance.keys().then(async (keys) => {
		const entries: Entry[] = [];
		for (const key of keys) {
			const cacheItem = await instance.getItem(key);
			entries[key] = cacheItem;
		}
		return entries;
	});
}

export async function updateEntry(key: string, { clearOnError = null, expiryDate = null, visited = false }: UpdateEntryArgs): Promise<CacheEntryInfo> {	
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
		return await instance.setItem(key, defaultEntry());
	}
}

export async function setEntryClearOnError(key: string, clearOnError: boolean): Promise<CacheEntryInfo> {
	try {
		const entry: CacheEntryInfo = await instance.getItem<CacheEntryInfo>(key);
		const updatedEntry: CacheEntryInfo = {
			...entry ?? defaultEntry,
			clearOnError: clearOnError
		};
		return await instance.setItem(key, updatedEntry);
	} catch(error) {
		return await instance.setItem(key, defaultEntry());
	}
}

export async function setEntryExpiryDate(key: string, expiryDate: number): Promise<CacheEntryInfo> {
	try {
		const entry: CacheEntryInfo = await instance.getItem<CacheEntryInfo>(key);
		const updatedEntry: CacheEntryInfo = {
			...entry ?? defaultEntry,
			expiryDate: expiryDate
		};
		return await instance.setItem(key, updatedEntry);
	} catch(error) {
		return await instance.setItem(key, defaultEntry());
	}
}

export async function increaseVisitFrequency(key: string): Promise<CacheEntryInfo> {
	try {
		const entry: CacheEntryInfo = await instance.getItem<CacheEntryInfo>(key);
		const updatedEntry: CacheEntryInfo = {
			...entry ?? defaultEntry,
			visitFrequency: entry.visitFrequency + 1
		};
		return await instance.setItem(key, updatedEntry);
	} catch(error) {
		return await instance.setItem(key, defaultEntry());
	}
}

