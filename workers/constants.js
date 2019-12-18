
const baseUrl = 'http://localhost:5000';

const urlsToCache = [
	'/',
	'/service-worker.js',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
	'https://fonts.googleapis.com/css?family=Roboto&display=optional',
	'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

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
	ADD_TO_CACHE: 'add_to_cache',
	APP_UPDATE: 'add_update',
	READ_OFFLINE: 'read_offline',
	SKIP_WAITING: 'skip_awaitng'
};

if (typeof self !== 'undefined') {
	self.push = push;
	self.http = http;
	self.events = events;
	self.baseUrl = baseUrl;
	self.urlsToCache = urlsToCache;
	self.stragedies = stragedies;
	self.messages = messages;
}