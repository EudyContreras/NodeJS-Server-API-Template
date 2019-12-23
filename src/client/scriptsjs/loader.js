/* eslint-env browser, es6 */

const applicationServerPublicKey = 'BEWGulnjPN48PcbKh6j2vriH-Z2tREZxe-I9zJJFqsGDMEHg1IyBrhzRgQR1Cn3fFCSmcwG79h3MCCRDLfelvuw';

const clientMessage = {
	APP_UPDATE: 'add_update',
	READ_OFFLINE: 'read_offline',
	SKIP_WAITING: 'skip_awaitng'
};

let isSubscribed = false;
let swRegistration = null;

const delay = ms => _ => new Promise(resolve => setTimeout(() => resolve(_), ms));

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

/**
 * Subscribe user from push notifications
 */
const subscribeUser = () => {
	if (!swRegistration) return;

	const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
	swRegistration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: applicationServerKey
	}).then(subscription => {
		console.log('User has now subscribed to push notifications');
		console.log(subscription);
		isSubscribed = true;

	}).catch(function (err) {
		console.log('Failed to subscribe the user to push notification: ', err);
	});
};

/**
 * Unsubscribe user from push notifications
 */
const unsubscribeUser = () => {
	if (!swRegistration) return;

	swRegistration.pushManager.getSubscription()
		.then(subscription => {
			if (subscription) {
				return subscription.unsubscribe();
			}
		})
		.catch(error => {
			console.log('Error unsubscribing', error);
		})
		.then(() => {
			console.log('User is unsubscribed.');
			isSubscribed = false;
		});
};

/**
 * Initialize push notifications subscription
 */
const initializeSubscription = () => {
	// Set the initial subscription value
	if (!swRegistration) return;

	swRegistration.pushManager.getSubscription()
		.then(subscription => {
			isSubscribed = !(subscription === null);

			if (isSubscribed) {
				console.log('User is subscribed to push notifications.');
			} else {
				console.log('User is not subscribed to push notifications.');
				setTimeout(() => {
					subscribeUser();
				}, 3000);
			}
		});
};

const registerBackgroundSync = () => {
	if (!swRegistration) return;

	swRegistration.sync.register('update-sync')
		.then(() => console.log('Registered background sync'))
		.catch(err => console.error('Error registering background sync', err));
};

// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', () => {
// 		navigator.serviceWorker.register('service-worker.js')
// 			.then(function () {
// 				return navigator.serviceWorker.ready;
// 			})
// 			.then(registration => {
// 				swRegistration = registration;

// 				// setTimeout(() => {
// 				// 	registerBackgroundSync();
// 				// }, 4000);

// 				if ('PushManager' in window) {
// 					//initializeSubscription();
// 				} else {
// 					console.warn('Push notifications is not supported by your current browser! Please use a modern browser to take advantage of push notifications capabitilies');
// 				}
	
// 			}, err => {
// 				console.log('ServiceWorker registration failed: ', err);
// 			}).catch(error => console.log(error));

// 		navigator.serviceWorker.ready.then(registration => {
// 			if (registration.sync) {
// 				registration.sync.register('initial-sync').catch(error => console.log(error));
// 			}
// 		});

// 		navigator.serviceWorker.onmessage = event => {
// 			const command = event.data;
		
// 			console.log('Message received', command);
			
// 			switch(command.type) {
// 				case clientMessage.APP_UPDATE: {
// 					const message = JSON.parse(command);
// 					console.log('Application update message', message);
// 					break;
// 				}
// 				case clientMessage.SKIP_WAITING: {
// 					self.skipWaiting();
// 				}
// 			}
// 		};
// 	});
// } else {
// 	console.warn('Service workers not supported on your current browser! Please use a modern browser to take advantage of offline capabitilies');
// }