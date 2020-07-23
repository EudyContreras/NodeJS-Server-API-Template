export enum SupportTarget {
	SERVICE_WORKER,
	STORAGE,
	CACHE_API,
	INDEX_DB
}

export function hasSupport(target: SupportTarget): boolean {
	switch (target) {
		case SupportTarget.SERVICE_WORKER: {
			return 'serviceWorker' in window.navigator;
		}
		case SupportTarget.STORAGE: {
			return 'storage' in window.navigator;
		}
	}
	return false;
}
