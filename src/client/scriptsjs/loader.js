/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = 'BEWGulnjPN48PcbKh6j2vriH-Z2tREZxe-I9zJJFqsGDMEHg1IyBrhzRgQR1Cn3fFCSmcwG79h3MCCRDLfelvuw';

let isSubscribed = false;
let swRegistration = null;

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

const subscribeUser = () => {
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

const initializeSubscription = () => {
	// Set the initial subscription value
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

if ('serviceWorker' in navigator && 'PushManager' in window) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('service-worker.js')
			.then(function () {
				return navigator.serviceWorker.ready;
			})
			.then(registration => {
				swRegistration = registration;
				initializeSubscription();
			}, err => {
				console.log('ServiceWorker registration failed: ', err);
			}).catch(error => console.log(error));

		navigator.serviceWorker.ready.then(registration => {
			if (registration.sync) {
				registration.sync.register('initial-sync').catch(error => console.log(error));
			}
		});
	});
} else {
	console.warn('Push messaging is not supported');
}