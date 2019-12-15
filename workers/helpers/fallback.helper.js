
const FALLBACK_CACHE = 'eudcon-universal-fallback-cache';

const contentTypes = {
	SVG: 'image/svg+xml',
	IMAGE: 'image/png',
	FONT: ''
};

self.useFallback = (contentType) => {
	switch(contentType) {
		case contentTypes.IMAGE: {
			return Promise.resolve(new Response(FALLBACK_CACHE, {
				headers: {
					'Content-Type': 'image/svg+xml'
				}
			}));
		}
	}
};
