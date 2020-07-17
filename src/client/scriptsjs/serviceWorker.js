// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const applicationServerPublicKey = 'BEWGulnjPN48PcbKh6j2vriH-Z2tREZxe-I9zJJFqsGDMEHg1IyBrhzRgQR1Cn3fFCSmcwG79h3MCCRDLfelvuw';

const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
	// [::1] is the IPv6 localhost address.
	window.location.hostname === '[::1]' ||
	// 127.0.0.1/8 is considered localhost for IPv4.
	window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const logger = {
	log: (...message) => {
		const css = 'background: #ffbf00bd; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c SW Register ', css, ...message);
	},
	warn: (...message) => {
		const css = 'background: #ffbf00bd; padding: 2px; border-radius: 4px; color: rgba(200, 180, 40, 1); font-weight: 600;';
		console.log('%c SW Register ', css, ...message);
	},
	error: (...message) => {
		const css = 'background: #ffbf00bd; padding: 2px; border-radius: 4px; color: rgba(200, 80, 20, 1); font-weight: 600;';
		console.log('%c SW Register ', css, ...message);
	}
};

const clientMessage = {
	APP_UPDATE: 'add_update',
	READ_OFFLINE: 'read_offline',
	SKIP_WAITING: 'skip_awaitng'
};

let isSubscribed = false;

const urlB64ToUint8Array = (base64String) => {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
};

const onRegistration = async (listener) => {
	if (!('serviceWorker' in navigator)) return;

	const registration = await navigator.serviceWorker.ready;

	if (!registration) return;

	listener(registration);
};

/**
 * Subscribe user from push notifications
 */
const subscribeUser = () => {
	onRegistration(registration => {
		const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

		registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: applicationServerKey
		}).then(subscription => {
			logger.log('User has now subscribed to push notifications', subscription);
			isSubscribed = true;
		}).catch(err => {
			logger.error('Failed to subscribe the user to push notification: ', err);
		});
	});
};

/**
 * Unsubscribe user from push notifications
 */
const unsubscribeUser = () => {
	onRegistration(registration => {
		registration.pushManager.getSubscription()
			.then(subscription => {
				if (subscription) {
					return subscription.unsubscribe();
				}
			})
			.catch(error => {
				logger.error('Error unsubscribing', error);
			})
			.then(() => {
				logger.log('User is unsubscribed.');
				isSubscribed = false;
			});
	});
};

/**
 * Initialize push notifications subscription
 */
const initializeSubscription = () => {
	// Set the initial subscription value
	onRegistration(registration => {
		registration.pushManager.getSubscription()
			.then(subscription => {
				isSubscribed = !(subscription === null);

				if (isSubscribed) {
					logger.log('User is subscribed to push notifications.');
				} else {
					logger.log('User is not subscribed to push notifications.');
					setTimeout(() => {
						subscribeUser();
					}, 3000);
				}
			});
	});
};

const registerValidSW = (swUrl, config) => {
	navigator.serviceWorker
		.register(swUrl)
		.then(() => {
			return navigator.serviceWorker.ready;
		})
		.then(registration => {
			logger.log(`ServiceWorker: Registered succesfully with scope: ${registration.scope}`);

			if (config.registerPushNotifications) {
				if ('PushManager' in window) {
					initializeSubscription();
				} else {
					logger.log('Push notifications is not supported by your current browser! Please use a modern browser to take advantage of push notifications capabitilies');
				}
			}

			registration.onupdatefound = () => {
				logger.log('ServiceWorker: update found!');
				const installingWorker = registration.installing;
				if (installingWorker == null) {
					return;
				}
				installingWorker.onstatechange = () => {
					if (installingWorker.state === 'installed') {
						if (navigator.serviceWorker.controller) {
							// At this point, the updated precached content has been fetched,
							// but the previous service worker will still serve the older
							// content until all client tabs are closed.
							logger.log(
								'ServiceWorker: New content is available and will be used when all ' +
								'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
							);

							// Execute callback
							if (config && config.onUpdate) {
								config.onUpdate(registration);
							}
						} else {
							// At this point, everything has been precached.
							// It's the perfect time to display a
							// "Content is cached for offline use." message.
							logger.log('ServiceWorker: Content is precached for offline use');

							// Execute callback
							if (config && config.onSuccess) {
								config.onSuccess(registration);
							}
						}
					}
				};
			};
		})
		.catch(error => {
			console.error('Error during service worker registration:', error);
		});
};

const checkValidServiceWorker = (swUrl, config) => {
	// Check if the service worker can be found. If it can't reload the page.
	fetch(swUrl).then(response => {
		// Ensure service worker exists, and that we really are getting a JS file.
		const contentType = response.headers.get('content-type');

		if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
			// No service worker found. Probably a different app. Reload the page.
			navigator.serviceWorker.ready.then(registration => {
				registration.unregister().then(() => {
					window.location.reload();
				});
			});
		} else {
			// Service worker found. Proceed as normal.
			registerValidSW(swUrl, config);
		}
	})
		.catch(() => {
			logger.log('ServiceWorker: No internet connection found. App is running in offline mode.');
		});
};


const registerWorker = (config) => {
	if (process.env.NODE_ENV === 'production' || config.clientSideRendered) {
		if ('serviceWorker' in navigator) {
			// The URL constructor is available in all browsers that support SW.
			const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

			if (publicUrl.origin !== window.location.origin) {
				// Our service worker won't work if PUBLIC_URL is on a different origin
				// from what our page is served on. This might happen if a CDN is used to
				// serve assets; see https://github.com/facebook/create-react-app/issues/2374
				return;
			}

			window.addEventListener('load', () => {
				const swUrl = 'service-worker.js';

				if (isLocalhost) {
					logger.log('ServiceWorker: in localhost!');
					// This is running on localhost. Let's check if a service worker still exists or not.
					checkValidServiceWorker(swUrl, config);

					// Add some additional logging to localhost, pointing developers to the
					// service worker/PWA documentation.
					navigator.serviceWorker.ready.then(() => {
						logger.log(
							'This web app is being served cache-first by a service ' +
							'worker. To learn more, visit https://bit.ly/CRA-PWA'
						);
					});
				} else {
					// Is not localhost. Just register service worker
					registerValidSW(swUrl, config);
				}
			});
		} else {
			logger.warn('Service workers not supported on your current browser! Please use a modern browser to take advantage of offline capabitilies');
		}
	} else {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('service-worker.js').then(registration => {
					registration.onupdatefound = () => {
						const worker = registration.installing;
						worker.onstatechange = () => {
							if (worker.state === 'waiting') {
								worker.postMessage('skipWaiting');
							}
							// Handle whatever other SW states you care about, like 'active'.
						};
					};
					return registration;
				}).catch(error => logger.error(error));
			});
		} else {
			logger.warn('Service workers not supported on your current browser! Please use a modern browser to take advantage of offline capabitilies');
		}
	}
};


const updateContentOnPageLoad = () => {

};

const addPeriodicBackgroundSync = async () => {
	const status = await navigator.permissions.query({
		name: 'periodic-background-sync'
	});

	if (status.state === 'granted') {

		const registration = await navigator.serviceWorker.ready;

		if ('periodicSync' in registration) {
			const tags = await registration.periodicSync.getTags();
			// Only update content if sync isn't set up.
			if (!tags.includes('content-sync')) {
				updateContentOnPageLoad();
			}
			try {
				await registration.periodicSync.register({
					tag: 'content-sync', // An interval of one day.
					minInterval: 24 * 60 * 60 * 1000,
					powerState: 'avoid-draining',
					networkState: 'avoid-cellular'
				});
			} catch (error) {
				// Periodic background sync cannot be used.
			}
		} else {
			// If periodic background sync isn't supported, always update.
			updateContentOnPageLoad();
		}
	} else {
		// Permision for periodic background sync has not been granted
	}

};

const addMessageListening = () => {
	navigator.serviceWorker.onmessage = event => {
		const command = event.data;

		logger.log('Message received', command);

		switch (command.type) {
			case clientMessage.APP_UPDATE: {
				const message = JSON.parse(command);
				logger.log('Application update message', message);
				break;
			}
			case clientMessage.SKIP_WAITING: {
				self.skipWaiting();
			}
		}
	};
};

const unregisterWorker = () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then(registration => {
			registration.unregister();
		});
	}
};

export const addToCache = async (cache, urls) => {
	const myCache = await window.caches.open(cache);
	await myCache.addAll(urls);
};

const watchOnlineStatus = () => {
	function isOnline() {
		const connectionStatus = document.getElementById('connectionStatus');
		if (navigator.onLine) {
			connectionStatus.innerHTML = 'You are currently online!';
		} else {
			connectionStatus.innerHTML = 'You are currently offline. Any requests made will be queued and synced as soon as you are connected again.';
		}
	}

	window.addEventListener('online', isOnline);
	window.addEventListener('offline', isOnline);
};

export const register = registerWorker;
export const unregister = unregisterWorker;
export const watchConnection = watchOnlineStatus;
