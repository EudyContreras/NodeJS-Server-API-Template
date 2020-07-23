import { events } from '../constants';

export const watchOnlineStatus = (): void => {
	const isOnline = (): void => {
		const connectionStatus = document.getElementById('connectionStatus');
		if (connectionStatus) {
			if (navigator.onLine) {
				connectionStatus.innerHTML = 'You are currently online!';
			} else {
				connectionStatus.innerHTML = 'You are currently offline. Any requests made will be queued and synced as soon as you are connected again.';
			}
		}
	};

	window.addEventListener(events.ONLINE, isOnline);
	window.addEventListener(events.OFFLINE, isOnline);
};
