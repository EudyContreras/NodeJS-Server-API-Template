var CACHE_NAME = 'eudcon-universal-react-cache';

var urlsToCache = [
  '/',
  '/sw.js',
  '/bundle.js',
  '/manifest.json',
  '/robots.txt',
  '/images/favicon.ico',
  '/images/favicon.png',
  '/images/logoicon.png',
  '/manifest.json',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => console.log(error))
  );
})

self.addEventListener('activate', function(event) {

  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).catch(error => console.log(error))
  );
});

self.addEventListener('fetch', function(event) {
  const request = event.request;

  console.log(request);

  event.respondWith(
    caches.match(request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(request).then(response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});