const keys = {
	APP_INSTALLED: 'APP_INSTALLED'
};

const events = {
	BEFORE_INSTALL: 'beforeinstallprompt',
	AFTER_INSTALL: 'appinstalled'
};

let deferredPrompt = null;

export const register = (onInstalled) => {
	window.addEventListener(events.BEFORE_INSTALL, event => {
		event.preventDefault();
		console.log('Not installed');
		localStorage.setItem(keys.APP_INSTALLED, false);
		onInstalled(false);
		deferredPrompt = event;
	});

	window.addEventListener(events.AFTER_INSTALL, () => {
		localStorage.setItem(keys.APP_INSTALLED, true);
		console.log('Is installed');
		onInstalled(true);
	});
};

export const isInstalled = () => {
	const installationState = localStorage.getItem(keys.APP_INSTALLED);
	if (installationState) {
		console.log('Has installation flag');
		return localStorage.getItem(keys.APP_INSTALLED) === 'true';
	} else {
		console.log('Has no installation flag');
	}
};

export const hasInstallInfo = () => {
	return localStorage.getItem(keys.APP_INSTALLED);
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

export const toggleFullScreen = () => {
	const doc = window.document;
	const docEl = doc.documentElement;

	const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
	} else {
		cancelFullScreen.call(doc);
	}
};