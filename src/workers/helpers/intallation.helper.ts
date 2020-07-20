import { logger } from '../commons';

const DEBUG_MODE = process.env.NODE_ENV !== 'production';

const keys = {
	APP_INSTALLED: 'APP_INSTALLED'
};

const events = {
	BEFORE_INSTALL: 'beforeinstallprompt',
	AFTER_INSTALL: 'appinstalled'
};

let deferredPrompt: any | null = null;

export const register = (onInstalled: (intalled: boolean) => void): void => {
	window.addEventListener(events.BEFORE_INSTALL, (event) => {
		event.preventDefault();
		localStorage.setItem(keys.APP_INSTALLED, String(false));
		DEBUG_MODE && logger.log('PWA not installed');
		onInstalled(false);
		deferredPrompt = event;
	});

	window.addEventListener(events.AFTER_INSTALL, () => {
		localStorage.setItem(keys.APP_INSTALLED, String(false));
		DEBUG_MODE && logger.log('PWA is installed');
		onInstalled(true);
	});
};

export const isInstalled = (): boolean => {
	const installationState = localStorage.getItem(keys.APP_INSTALLED);
	if (installationState) {
		const installed = localStorage.getItem(keys.APP_INSTALLED) === 'true';
		DEBUG_MODE && logger.log('PWA has been installed: ', installed);
		return installed;
	} else {
		DEBUG_MODE && logger.log('PWA has not been installed');
		return false;
	}
};

export const hasInstallInfo = (): boolean => localStorage.getItem(keys.APP_INSTALLED) != null;

export const showPrompt = (): void => {
	if (deferredPrompt !== null) {
		deferredPrompt.prompt();
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				DEBUG_MODE && logger.log('User accepted the app installation prompt');
			} else {
				DEBUG_MODE && logger.log('User dismissed the app installation prompt');
			}
			deferredPrompt = null;
		});
	}
};

export const toggleFullScreen = (): void => {
	const doc: any = window.document;
	const docEl: any = doc.documentElement;

	const requestFullScreen =
		docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	const cancelFullScreen =
		doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
	} else {
		cancelFullScreen.call(doc);
	}
};
