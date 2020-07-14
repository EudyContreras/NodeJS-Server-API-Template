
const baseUrl = '/?source=pwa';
const appShellPage = '/?appshell=true';
const offlineFallbackPage = '/offline.html';

export const storage = {
	NAME: 'Worker data storage',
	DESCRIPTION: 'Templagte Engine Cache Handling Storage'
};

export const headers = {
	DATE_HEADER_KEY: 'date',
	EXPIRATION_HEADER_KEY: 'sw-cache-expiration-date',
	FREQUENCY_HEADER_KEY: 'sw-cache-use-frequency'
};

export const clientMessages = {
	UPDATE_AVAILABLE: 'update_available'
};

export const urlsToCache = [
	'',
	'/',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://fonts.googleapis.com/css?family=Roboto&display=optional',
	'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

export interface CacheNames {
	DATA_CACHE: string;
	IMAGE_CACHE: string;
	MEDIA_CACHE: string;
	STATIC_CACHE: string;
	FALLBACK_CACHE: string;
	QUEUE_CACHE: string;
	GOOGLE_FONTS_SHEETS_CACHE: string;
	GOOGLE_FONTS_WEB_CACHE: string;
};

export const cacheNames = (version?: string | undefined): CacheNames =>({
	DATA_CACHE: `eudcon-universal-data-cache-${version || ''}`,
	IMAGE_CACHE: `eudcon-universal-image-cache-${version || ''}`,
	MEDIA_CACHE: `eudcon-universal-media-cache-${version || ''}`,
	STATIC_CACHE: `eudcon-universal-static-cache-${version || ''}`,
	FALLBACK_CACHE: `eudcon-universal-fallback-cache-${version || ''}`,
	QUEUE_CACHE: `eudcon-universal-request-queue-cache-${version || ''}`,
	GOOGLE_FONTS_SHEETS_CACHE: `educon-universal-google-fonts-sheets-${version || ''}`,
	GOOGLE_FONTS_WEB_CACHE: `educon-universal-google-fonts-web-${version || ''}`
});

export const syncEvents = {
	INITIAL_SYNC: 'initial-sync',
	UPDATE_SYNC: 'update-sync',
	periodic: {
		CONTENT_SYNC: 'content-sync'
	}
};

export const contentTypes = {
	HTML: 'text/html',
	SVG: 'image/svg+xml',
	IMAGE: 'image/png',
	FONT: ''
};

export const updateNotification = {
	title: 'Template engine',
	options: {
		requireInteraction: true,
		body: 'There is update available! Would you like to see it?',
		icon: './images/icons/icon-152x152.png',
		badge: './images/icons/icon-152x152.png',
		actions: [{
			title: 'yes',
			action: 'action-1'
		}, {
			title: 'no',
			action: 'action-2'
		}]
	}
};

export const events = {
	SYNC: 'sync',
	CONTROLLING: 'controlling',
	PERIODIC_SYNC: 'periodicsync',
	NOTIFY_CLICK: 'notificationclick',
	EXTERNAL_WAITING: 'externalwaiting',
	INSTALLED: 'installed',
	INSTALL: 'install',
	ACTIVATE: 'activate',
	ACTIVATED: 'activated',
	WAITING: 'waiting',
	MESSAGE: 'message',
	FETCH: 'fetch',
	PUSH: 'push'
};

export const stragedies = Object.freeze({
	CACHE_ONLY: 'cache_only_stragedy', // If there is available cache only serve the cache
	CACHE_FIRST: 'cache_first_stragedy', // Ideal for resources that do not change often
	CACHE_THEN_PRELOAD: 'cache_then_preload_stragedy', // Ideal for resources that do not change often
	NETWORK_ONLY: 'network_only_stragedy', // If there is a network connection only serve from network
	NETWORK_FIRST: 'network_first_stragedy', // Ideal for resources or content that changes frequently
	STALE_REVALIDATE: 'stale_revalidate_stragedy', // Ideal for when the latest resource is not essential
	UPDATE_REFRESH: 'update_refresh_stragedy', //
	NON_FOUND: 'no_found_stragedy' // When no suitable stragedy is found for the request
});

export const sideEffects = {
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE',
	PATCH: 'PATCH'
};

export const httpMethods = {
	...sideEffects,
	GET: 'GET'
};

export const push = {
	NEW_UPDATE: 'new-update'
};

export const messages = {
	REFRESH: 'refresh',
	CACHE_URLS: 'cache-urls',
	APP_UPDATE: 'add-update',
	READ_OFFLINE: 'read-offline',
	SKIP_WAITING: 'skip-awaitng',
	ADD_TO_CACHE: 'add-to-cache',
	PURGE_EXPIRED_CACHE: 'purgo-expired-cache',
	WB_BROADCAST_UPDATE: 'workbox-broadcast-update',
	REMOVE_FROM_CACHE: 'remove-from-cache'
};

export const cachableTypes = {
	DOCUMENT: 'document',
	WORKER: 'worker',
	OBJECT: 'object',
	IMAGE: 'image',
	SCRIPT: 'script',
	STYLE: 'style',
	AUDIO: 'audio',
	VIDEO: 'video',
	FONT: 'font'
};

export const responseType = {
	CORS: 'cors',
	BASIC: 'basice',
	ERROR: 'error',
	OPAQUE: 'opaque'
};

export const commonOrigins = {
	STYLESHEET_FONTS: 'https://fonts.googleapis.com',
	STATIC_WEB_FONTS: 'https://fonts.gstatic.com'
};

export const fallbacks = {
	FALLBACK_HTML_URL: offlineFallbackPage,
	FALLBACK_ERROR_URL: '',
	FALLBACK_IMAGE_URL: '',
	FALLBACK_FONT_URL: ''
};

export const constants = Object.freeze({
	push: push,
	baseUrl: baseUrl,
	fallbacks: fallbacks,
	urlsToCache: urlsToCache,
	stragedies: stragedies,
	messages: messages,
	cacheNames: cacheNames,
	sideEffects: sideEffects,
	httpMethods: httpMethods,
	syncEvents: syncEvents,
	appShellPage: appShellPage,
	contentTypes: contentTypes,
	commonOrigins: commonOrigins,
	cachableTypes: cachableTypes,
	clientMessages: clientMessages,
	offlineFallbackPage: offlineFallbackPage,
	updateNotification: updateNotification
});