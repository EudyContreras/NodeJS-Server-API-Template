const props = {};

window.__REDUX_STATE__ = props.state;

window.onload = () => {
	document.getElementById('robotoFont').removeAttribute('disabled');
	document.getElementById('materialIcons').removeAttribute('disabled');
};

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('service-worker.js')
			.then(function () {
				return navigator.serviceWorker.ready;
			})
			.then(registration => {
				console.log('ServiceWorker registration successful with scope: ', registration.scope);

			}, function (err) {
				console.log('ServiceWorker registration failed: ', err);
			}).catch(error => console.log(error));

		navigator.serviceWorker.ready.then(registration => {
			if (registration.sync) {
				registration.sync.register('initial-sync').catch(error => console.log(error));
			}
		});
	});
}

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

isOnline();

const updateContentOnPageLoad = () => {

};

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
				tag: 'content-sync',				// An interval of one day.
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
	// Periodic background sync cannot be used.
}
