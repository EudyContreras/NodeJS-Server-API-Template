
self.FALLBACK_CACHE = 'eudcon-universal-fallback-cache';

self.contentTypes = {
	HTML: 'text/html',
	SVG: 'image/svg+xml',
	IMAGE: 'image/png',
	FONT: ''
};

self.getFallback = ({ contentType = self.contentType.HTML, response = null }) => {
	switch(contentType) {
		case contentType.HTML: {
			const cache = caches.open(self.FALLBACK_CACHE);
			return cache.match('/offline.html');
		}
	}
};

self.useFallback = ({ contentType = self.contentType.HTML, response = null }) => {
	switch(contentType) {
		case self.contentTypes.IMAGE: {
			return Promise.resolve(new Response(self.FALLBACK_CACHE, {
				headers: {
					'Content-Type': 'image/svg+xml'
				}
			}));
		}
	}
};
