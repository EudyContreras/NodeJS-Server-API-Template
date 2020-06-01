const baseUrl = '';

const urlsToCache = [
	'/',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://fonts.googleapis.com/css?family=Roboto&display=optional',
	'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

const cacheKeys = {
	DATA_CACHE: 'eudcon-universal-data-cache',
	IMAGE_CACHE: 'eudcon-universal-image-cache',
	STATIC_CACHE: 'eudcon-universal-static-cache',
	FALLBACK_CACHE: 'eudcon-universal-fallback-cache'
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
		icon: '../static/images/icons/icon-152x152.png',
		badge: '../static/images/icons/icon-152x152.png',
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
	PERIODIC_SYNC: 'periodicsync',
	NOTIFY_CLICK: 'notificationclick',
	INSTALL: 'install',
	ACTIVATE: 'activate',
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

const http = {
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE',
	PATCH: 'PATCH'
};

const push = {
	NEW_UPDATE: 'new-update'
};

const messages = {
	REFRESH: 'refresh',
	APP_UPDATE: 'add_update',
	READ_OFFLINE: 'read_offline',
	SKIP_WAITING: 'skip_awaitng',
	ADD_TO_CACHE: 'add_to_cache',
	REMOVE_FROM_CACHE: 'remove_from_cache'
};

const constants = Object.freeze({
	push: push,
	http: http,
	events: events,
	baseUrl: baseUrl,
	urlsToCache: urlsToCache,
	stragedies: stragedies,
	messages: messages,
	cacheKeys: cacheKeys,
	syncEvents: syncEvents,
	contentTypes: contentTypes,
	updateNotification: updateNotification
});

export {
	push,
	http,
	events,
	baseUrl,
	urlsToCache,
	stragedies,
	messages,
	cacheKeys,
	syncEvents,
	contentTypes,
	updateNotification,
	constants
};

export default constants;