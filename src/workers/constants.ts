const baseUrl = '/?source=pwa';
const appShellPage = '/?appshell=true';
const offlineFallbackPage = '/offline.html';

const info = {
	APP_NAME: 'template-engine',
	CACHE_VERSION: 'v0.01'
};

const clientMessages = {
	UPDATE_AVAILABLE: 'update_available'
};

const urlsToCache = [
	'',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://fonts.googleapis.com/css?family=Roboto&display=optional',
	'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

const cacheKeys = {
	DATA_CACHE: 'eudcon-universal-data-cache',
	IMAGE_CACHE: 'eudcon-universal-image-cache',
	MEDIA_CACHE: 'eudcon-universal-media-cache',
	STATIC_CACHE: 'eudcon-universal-static-cache',
	FALLBACK_CACHE: 'eudcon-universal-fallback-cache',
	PRECACHE_CACHE: 'eudcon-universal-precache-cache',
	RUNTIME_CACHE: 'eudcon-universal-runtime-cache',
	QUEUE_CACHE: 'eudcon-universal-request-queue-cache',
	GOGGLE_ANALYTICS: 'eudcon-universal-google-analytics',
	GOOGLE_FONTS_SHEETS_CACHE: 'educon-universal-google-fonts-sheets',
	GOOGLE_FONTS_WEB_CACHE: 'educon-universal-google-fonts-web'
};

const syncEvents = {
	INITIAL_SYNC: 'initial-sync',
	UPDATE_SYNC: 'update-sync',
	CONTENT_SYNC: 'content-sync'
};

const contentTypes = {
	HTML: 'text/html',
	SVG: 'image/svg+xml',
	IMAGE: 'image/png',
	FONT: ''
};

const updateNotification = {
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

const events = {
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

const stragedies = Object.freeze({
	CACHE_ONLY: 'cache_only_stragedy', // If there is available cache only serve the cache
	CACHE_FIRST: 'cache_first_stragedy', // Ideal for resources that do not change often
	CACHE_THEN_PRELOAD: 'cache_then_preload_stragedy', // Ideal for resources that do not change often
	NETWORK_ONLY: 'network_only_stragedy', // If there is a network connection only serve from network
	NETWORK_FIRST: 'network_first_stragedy', // Ideal for resources or content that changes frequently
	STALE_REVALIDATE: 'stale_revalidate_stragedy', // Ideal for when the latest resource is not essential
	UPDATE_REFRESH: 'update_refresh_stragedy', //
	NON_FOUND: 'no_found_stragedy' // When no suitable stragedy is found for the request
});

const sideEffects = {
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE',
	PATCH: 'PATCH'
};

const httpMethods = {
	...sideEffects,
	GET: 'GET'
};

const push = {
	NEW_UPDATE: 'new-update'
};

const messages = {
	REFRESH: 'refresh',
	CACHE_URLS: 'cache-urls',
	APP_UPDATE: 'add-update',
	READ_OFFLINE: 'read-offline',
	SKIP_WAITING: 'skip-awaitng',
	ADD_TO_CACHE: 'add-to-cache',
	WB_BROADCAST_UPDATE: 'workbox-broadcast-update',
	REMOVE_FROM_CACHE: 'remove-from-cache'
};

const cachableTypes = {
	DOCUMENT: 'document',
	IMAGES: 'images',
	SCRIPTS: 'script',
	STYLES: 'styles',
	AUDIO: 'audio',
	VIDEO: 'video',
	FONT: 'font'
};

const commonOrigins = {
	STYLESHEET_FONTS: 'https://fonts.googleapis.com',
	STATIC_WEB_FONTS: 'https://fonts.gstatic.com'
};

const fallbacks = {
	FALLBACK_HTML_URL: offlineFallbackPage,
	FALLBACK_ERROR_URL: '',
	FALLBACK_IMAGE_URL: '',
	FALLBACK_FONT_URL: ''
};

const constants = Object.freeze({
	info: info,
	push: push,
	events: events,
	baseUrl: baseUrl,
	fallbacks: fallbacks,
	urlsToCache: urlsToCache,
	stragedies: stragedies,
	messages: messages,
	cacheKeys: cacheKeys,
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

export {
	push,
	info,
	events,
	baseUrl,
	urlsToCache,
	stragedies,
	messages,
	fallbacks,
	cacheKeys,
	syncEvents,
	httpMethods,
	sideEffects,
	contentTypes,
	cachableTypes,
	commonOrigins,
	appShellPage,
	clientMessages,
	updateNotification,
	offlineFallbackPage,
	constants
};

export default constants;