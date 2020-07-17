import { CacheNames } from '../constants';
import { requestPermission, Permission, AccessStatus } from './access.helper';
import { hasFeature, WorkerFeature } from './feature.helper';
import { days } from './span.helper';
import { logger } from '../commons';
import { onRegistration } from './register.helper';

const DEBUG_MODE = (process.env.NODE_ENV !== 'production');
   
export const syncEvents = {
	contentSync: {
		tag: 'content-sync',
		minInterval: days(1),
		powerState: 'avoid-draining',
		networkState: 'avoid-cellular'
	}
};

export async function syncContent(cacheNames: CacheNames): Promise<void> {
	const objectKeys = Object.values(cacheNames);

	try {
		for (const key of objectKeys) {
			const cache = await caches.open(key);
			const requests = await cache.keys();
			const urls = requests.map((x: Request) => x.url);

			if (urls.length > 0) {
				requests.forEach(async (request) => {
					await cache.delete(request);
				});
				await caches.delete(key);
				await caches.open(key).then(cache => cache.addAll(urls));
			} else {
				await caches.delete(key);
			}
		}
	} catch(error) {
		DEBUG_MODE && logger.error('Could not sync all content: ', error);
	}

	return Promise.resolve();
};

export async function addPeriodicBackgroundSync(
	syncEvent: PeriodicSyncEvent,
	syncCallback?: () => void,
	onError?: (...messages: any[]) => void
): Promise<void> {
	const status = await requestPermission(Permission.BACKGROUND_SYNC_PERIODIC);
	
	if (status === AccessStatus.GRANTED) {
		const registration = await navigator.serviceWorker.ready;

		if (hasFeature(registration, WorkerFeature.PERIODIC_SYNC)) {
			const tags = await registration.periodicSync.getTags();

			if (!tags.includes(syncEvent.tag)) {
				syncCallback?.();
			}
			try {
				await registration.periodicSync.register(syncEvent);
				if (DEBUG_MODE) {
					registration.periodicSync.getTags().then(tags => {
						logger.log('Registered tags: ', tags);
					});
				}
			} catch (error) {
				onError?.('Periodic background sync cannot be used!', error);
			}
		} else {
			syncCallback?.();
		}
	} else {
		onError?.('Permision for periodic background sync has not been granted!');
	}
};

export function addBackgroundSync(syncName): void {
	onRegistration(registration => {
		if (registration.sync) {
			registration.sync.register(syncName)
				.then(() => logger.log('Registered background sync: ', syncName))
				.catch(error => logger.error('Error registering background sync: ', error));
		}
	});
};