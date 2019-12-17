

self.update = request => {
	return fetch(request.url).then(response => {
		if (!response.ok) throw new Error('Network error');

		return caches.open(self.DATA_CACHE).then(cache => {
			cache.put(request.url, response.clone());
			return response;
		}).then(response => response);
	});
};

self.refresh = response => {
	return response.json()
		.then(jsonResponse => {		
			self.clients.matchAll().then(clients => {
				clients.forEach(client => {
					client.postMessage(JSON.stringify({
						type: self.messages.APP_UPDATE,
						data: {
							url: response.url,
							payload: jsonResponse.content
						}
					}));
				});
			});
			return jsonResponse.content;
		});
};