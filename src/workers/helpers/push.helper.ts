import { logger } from '../commons';
import { seconds } from './timespan.helper';

const applicationServerPublicKey =
	'BEWGulnjPN48PcbKh6j2vriH-Z2tREZxe-I9zJJFqsGDMEHg1IyBrhzRgQR1Cn3fFCSmcwG79h3MCCRDLfelvuw';

const urlB64ToUint8Array = (base64String: string): Uint8Array => {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
};

export const hasPushSubscription = async (): Promise<boolean> => {
	if (!navigator.serviceWorker) return false;

	const registration = await navigator.serviceWorker.ready;
	const subscription = await registration.pushManager.getSubscription();

	return subscription != null;
};

/**
 * Subscribe user from push notifications
 */
export const subscribeUser = async (): Promise<void> => {
	if (!navigator.serviceWorker) return;

	const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

	const registration = await navigator.serviceWorker.ready;

	registration.pushManager
		.subscribe({
			userVisibleOnly: true,
			applicationServerKey: applicationServerKey
		})
		.then((subscription) => {
			logger.log('User has now subscribed to push notifications', subscription);
		})
		.catch((err) => {
			logger.error('Failed to subscribe the user to push notification! ', err);
		});
};

/**
 * Unsubscribe user from push notifications
 */
export const unsubscribeUser = async (): Promise<boolean | undefined> => {
	if (!navigator.serviceWorker) return false;

	const registration = await navigator.serviceWorker.ready;

	return registration.pushManager
		.getSubscription()
		.then((subscription) => (subscription && subscription.unsubscribe()) || false)
		.catch((error) => {
			logger.error('Error unsubscribing from push notifications', error);
		})
		.then(() => {
			logger.log('User has unsubscribed from push notifications.');
			return false;
		});
};

/**
 * Initialize push notifications subscription
 */
export const initializeSubscription = async (delay = seconds(3)): Promise<void> => {
	if (!navigator.serviceWorker) return;

	const registration = await navigator.serviceWorker.ready;

	registration.pushManager.getSubscription().then((subscription) => {
		const isSubscribed = !(subscription === null);

		if (isSubscribed) {
			logger.log('User is subscribed to push notifications.');
		} else {
			logger.log('User is not subscribed to push notifications.');
			setTimeout(() => {
				subscribeUser();
			}, delay);
		}
	});
};
