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

export function updateEntry(key: string, { clearOnError = null, expiryDate = null, visited = false }: UpdateEntryArgs): void {
	instance.getItem<CacheEntryInfo>(key).then((entry: CacheEntryInfo) => {
		const frequency = visited ? (entry.visitFrequency ?? 0) + 1 : (entry.visitFrequency ?? 0);
		const updatedEntry: CacheEntryInfo = {
			...entry,
			visitFrequency: frequency,
			clearOnError: clearOnError ?? entry.clearOnError ?? false,
			expiryDate: expiryDate ?? entry.expiryDate ?? null
		};
		instance.setItem(key, updatedEntry);
	}).catch(() => {
		instance.setItem(key, defaultEntry());
	});
}

export function setEntryClearOnError(key: string, clearOnError: boolean): void {
	instance.getItem<CacheEntryInfo>(key).then((entry: CacheEntryInfo) => {
		const updatedEntry: CacheEntryInfo = {
			...entry,
			clearOnError: clearOnError
		};
		instance.setItem(key, updatedEntry);
	}).catch(() => {
		instance.setItem(key, defaultEntry());
	});
}

export function setEntryExpiryDate(key: string, expiryDate: number): void {
	instance.getItem<CacheEntryInfo>(key).then((entry: CacheEntryInfo) => {
		const updatedEntry: CacheEntryInfo = {
			...entry,
			expiryDate: expiryDate
		};
		instance.setItem(key, updatedEntry);
	}).catch(() => {
		instance.setItem(key, defaultEntry());
	});
}

export function increaseVisitFrequency(key: string): void {
	instance.getItem<CacheEntryInfo>(key).then((entry: CacheEntryInfo) => {
		const updatedEntry: CacheEntryInfo = {
			...entry,
			visitFrequency: entry.visitFrequency + 1
		};
		instance.setItem(key, updatedEntry);
	}).catch(() => {
		instance.setItem(key, defaultEntry());
	});
}

