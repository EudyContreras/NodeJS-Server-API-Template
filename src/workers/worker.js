/* eslint-disable no-undef */

self.STATIC_CACHE = 'eudcon-universal-static-cache';
self.DATA_CACHE = 'eudcon-universal-data-cache';

self.importScripts('constants.js');

self.worker = {
	log: (...message) => {
		const css = 'background: #00b6ffbd; padding: 2px; border-radius: 2px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	warn: (message) => {
		const css = 'background: #ffbf00bd; padding: 2px; border-radius: 2px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	error: (message) => {
		const css = 'background: #ff0038bd; padding: 2px; border-radius: 2px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	}
};

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
	new RegExp('https://hacker-news.firebaseio.com'),
	new workbox.strategies.StaleWhileRevalidate()
);

self.addEventListener('push', (event) => {
	const title = 'Get Started With Workbox';
	const options = {
		body: event.data.text()
	};
	event.waitUntil(self.registration.showNotification(title, options));
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.precaching.precacheAndRoute(self.urlsToCache);

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
workbox.routing.registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'google-fonts-stylesheets'
	})
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
workbox.routing.registerRoute(
	/^https:\/\/fonts\.gstatic\.com/,
	new workbox.strategies.CacheFirst({
		cacheName: 'google-fonts-webfonts',
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200]
			}),
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 365
			})
		]
	})
);

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|webp|svg)$/,
	new workbox.strategies.CacheFirst({
		cacheName: 'images',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
			})
		]
	})
);

workbox.routing.registerRoute(
	/\.(?:js|css)$/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'static-resources'
	})
);