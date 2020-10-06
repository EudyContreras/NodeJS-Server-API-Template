import { logger } from '../commons';
import { IndexDB } from '../handlers/KeyVal.handler';

const DEBUG_MODE = process.env.NODE_ENV !== 'production';

const keys = {
	APP_INSTALLED: 'APP_INSTALLED'
};

const events = {
	BEFORE_INSTALL: 'beforeinstallprompt',
	AFTER_INSTALL: 'appinstalled'
};

let deferredPrompt: any | null = null;

export const registerListener = (onInstalled: (intalled: boolean) => void): (() => void) => {
	const beforeListener = (event): void => {
		event.preventDefault();
		IndexDB.setItem(keys.APP_INSTALLED, false).then((value) => {
			DEBUG_MODE && logger.log('PWA not installed');
			onInstalled(false);
			deferredPrompt = event;
		});
	};
	const afterListener = (event): void => {
		IndexDB.setItem(keys.APP_INSTALLED, true).then(() => {
			DEBUG_MODE && logger.log('PWA is installed');
			onInstalled(true);
		});
	};

	window.addEventListener(events.BEFORE_INSTALL, beforeListener);
	window.addEventListener(events.AFTER_INSTALL, afterListener);

	return (): any => {
		window.removeEventListener(events.AFTER_INSTALL, beforeListener);
		window.removeEventListener(events.AFTER_INSTALL, afterListener);
	};
};

export const isInstalled = (): Promise<boolean> =>
	IndexDB.getItem(keys.APP_INSTALLED)
		.then((installed: boolean) => {
			if (installed === true) {
				DEBUG_MODE && logger.log('PWA has been installed: ', installed);
				return installed;
			} else {
				DEBUG_MODE && logger.log('PWA has not been installed');
				return false;
			}
		})
		.catch(() => false);

export const hasInstallInfo = (): Promise<boolean | null> =>
	IndexDB.getItem(keys.APP_INSTALLED)
		.then((isInstalled: boolean) => {
			if (isInstalled === true || isInstalled === false) {
				return isInstalled;
			} else {
				return null;
			}
		})
		.catch(() => false);

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

	const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
	} else {
		cancelFullScreen.call(doc);
	}
};
