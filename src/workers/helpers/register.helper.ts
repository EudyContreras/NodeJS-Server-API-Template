import { logger } from '../commons';
import { initializeSubscription } from './push.helper';
import { messages, events } from '../constants';

const DEBUG_MODE = (process.env.NODE_ENV !== 'production');

const workerURL = 'service-worker.js';

const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
	// [::1] is the IPv6 localhost address.
	window.location.hostname === '[::1]' ||
	// 127.0.0.1/8 is considered localhost for IPv4.
	window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const workerState = {
	INSTALLING: 'installing',
	WAITING: 'waiting'
};

export const onRegistration = async (listener: (registration: ServiceWorkerRegistration) => void): Promise<void> => {
	if (!navigator.serviceWorker) return;

	const registration = await navigator.serviceWorker.ready;

	if (!registration) return;

	listener(registration);
};

export function unregisterWorker(): void {
	if (navigator.serviceWorker) {
		navigator.serviceWorker?.ready.then(registration => {
			registration.unregister();
		});
	}
};

async function checkValidServiceWorker(swUrl, config): Promise<void> {
	fetch(swUrl).then(response => {
		const contentType = response.headers.get('content-type');

		if (!response.ok || response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
			navigator.serviceWorker?.ready?.then(registration => {
				registration.unregister().then(() => {
					window.location.reload();
				});
			});
		} else {
			registerValidSW(swUrl, config);
		}
	}).catch(() => {
		DEBUG_MODE && logger.log('ServiceWorker: No internet connection found. App is running in offline mode.');
	});
};

export const registerWorker = (config): void => {
	if (!DEBUG_MODE || config.clientSideRendered) {
		if (navigator.serviceWorker) {
			const publicUrl = new URL(process.env.PUBLIC_URL || '', window.location.href);

			if (publicUrl.origin !== window.location.origin) return;

			window.addEventListener(events.LOAD, () => {
				if (isLocalhost) {
					DEBUG_MODE && logger.log('Servic eWorker: in localhost!');
					checkValidServiceWorker(workerURL, config);

					navigator.serviceWorker.ready.then(() => {
						window.removeEventListener(events.LOAD, () => {});
						DEBUG_MODE && logger.log(
							'This web app is being served cache-first by a service ' +
							'worker. To learn more, visit https://bit.ly/CRA-PWA'
						);
					});
				} else {
					registerValidSW(workerURL, config);
				}
			});
		} else {
			DEBUG_MODE && logger.warn('Service workers not supported on your current browser! Please use a modern browser to take advantage of offline capabitilies');
		}
	} else {
		if (navigator.serviceWorker) {
			window.addEventListener(events.LOAD, () => {
				navigator.serviceWorker.register(workerURL).then(registration => {
					if (registration) {
						DEBUG_MODE && logger.warn('Service Worker: in localhost!');
						registration.onupdatefound = (): void => {
							DEBUG_MODE && logger.warn('Update found for development service worker!');
							const worker = registration.installing;
							if (worker) {
								worker.onstatechange = (): void => {
									DEBUG_MODE && logger.warn('Service Wworker state changed: ', worker.state);
									if (worker.state === workerState.INSTALLING) {
										worker.postMessage(messages.SKIP_WAITING);
									}
								};
							}
						};
					}
					window.removeEventListener(events.LOAD, () => {});
					return registration;
				}).catch(error => logger.error(error));
			});
		} else {
			DEBUG_MODE && logger.warn('Service workers not supported on your current browser! Please use a modern browser to take advantage of offline capabitilies');
		}
	}
};

const registerValidSW = async (swUrl, config): Promise<void> => {
	if (!navigator.serviceWorker) return;

	navigator.serviceWorker.register(swUrl)
		.then(() => navigator.serviceWorker.ready)
		.then(registration => {
			DEBUG_MODE && logger.log(`ServiceWorker: Registered succesfully with scope: ${registration.scope}`);

			if (config.registerPushNotifications && window.PushManager) {
				initializeSubscription();
			} else {
				DEBUG_MODE && logger.log('Push notifications is not supported by your current browser! Please use a modern browser to take advantage of push notifications capabitilies');
			}

			registration.onupdatefound = (): void => {
				DEBUG_MODE && logger.log('Service Worker update found!');
				const installingWorker = registration.installing;

				if (installingWorker == null) {
					return;
				}

				installingWorker.onstatechange = (): void => {
					if (installingWorker.state === 'installed') {
						if (navigator.serviceWorker.controller) {

							DEBUG_MODE && logger.log(
								'ServiceWorker: New content is available and will be used when all ' +
								'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
							);

							if (config && config.onUpdate) {
								config.onUpdate(registration);
							}
						} else {
							DEBUG_MODE && logger.log('ServiceWorker: Content is now cached for offline use');

							if (config && config.onSuccess) {
								config.onSuccess(registration);
							}
						}
					}
				};
			};
		})
		.catch(error => {
			window.removeEventListener(events.LOAD, () => {});
			DEBUG_MODE && logger.error('Error during service worker registration:', error);
		});
};
