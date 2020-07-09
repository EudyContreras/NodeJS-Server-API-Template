/* eslint-disable @typescript-eslint/no-unused-vars */

export const myPlugin = {
	cacheWillUpdate: async ({ request, response, event }): Promise<Response> => {
		// Return `response`, a different `Response` object, or `null`.
		return response;
	},
	cacheDidUpdate: async ({ cacheName, request, oldResponse, newResponse, event }): Promise<void> => {
		// No return expected
		// Note: `newResponse.bodyUsed` is `true` when this is called,
		// meaning the body has already been read. If you need access to
		// the body of the fresh response, use a technique like:
		// const freshResponse = await caches.match(request, {cacheName});
	},
	cacheKeyWillBeUsed: async ({ request, mode }): Promise<Request> => {
		// `request` is the `Request` object that would otherwise be used as the cache key.
		// `mode` is either 'read' or 'write'.
		// Return either a string, or a `Request` whose `url` property will be used as the cache key.
		// Returning the original `request` will make this a no-op.
		return request;
	},
	cachedResponseWillBeUsed: async ({ cacheName, request, matchOptions, cachedResponse, event }): Promise<Response> => {
		// Return `cachedResponse`, a different `Response` object, or null.
		return cachedResponse;
	},
	requestWillFetch: async ({ request }): Promise<Request> => {
		// Return `request` or a different `Request` object.
		return request;
	},
	fetchDidFail: async ({ originalRequest, request, error, event }) => {
		// No return expected.
		// NOTE: `originalRequest` is the browser's request, `request` is the
		// request after being passed through plugins with
		// `requestWillFetch` callbacks, and `error` is the exception that caused
		// the underlying `fetch()` to fail.
	},
	fetchDidSucceed: async ({ request, response }): Promise<Response> => {
		// Return `response` to use the network response as-is,
		// or alternatively create and return a new `Response` object.
		return response;
	}
};
