
const events = {
	APP_INSTALLED: 'APP_INSTALLED',
	BEFORE_INSTALL: 'beforeinstallprompt',
	AFTER_INSTALL: 'appinstalled'
};

let deferredPrompt = null;

export const register = (onInstalled) => {
	window.addEventListener(events.BEFORE_INSTALL, event => {
		event.preventDefault();
		localStorage.setItem(events.APP_INSTALLED, false);
		onInstalled(false);
		deferredPrompt = event;
	});

	window.addEventListener(events.AFTER_INSTALL, () => {
		localStorage.setItem(events.APP_INSTALLED, true);
		onInstalled(true);
	});
};

export const isInstalled = () => {
	return localStorage.getItem(events.APP_INSTALLED) == 'true';
};

export const showPrompt = () => {
	if (deferredPrompt !== null) {
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the app installation prompt');
			} else {
				console.log('User dismissed the app installation prompt');
			}
			deferredPrompt = null;
		});
	}
};