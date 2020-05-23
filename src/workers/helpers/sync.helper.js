
const syncEvents = {
	INITIAL_SYNC: 'initial-sync',
	UPDATE_SYNC: 'update-sync',
	CONTENT_SYNC: 'content-sync'
};

const initialSync = () => {
	return new Promise((resolve)=> {
		return resolve(true);
	});
};

const contentSync = () => {
	return new Promise((resolve)=> {
		return resolve(true);
	});
};

const updateSync = (baseUrl) => {
	return self.update({ url: baseUrl + '/rest/api/schema' })
		.then(self.refresh)
		.then(data => {
			self.registration.showNotification(`New api version ${data.version}`);
			return 'Notification sent';
		});
};

/**
 * Attempt to sync non-urgent content silently on the background
 */
self.addEventListener(self.events.SYNC, event => {
	self.worker.log('Received sync event:', event.tag);
	switch(event.tag) {
		case syncEvents.INITIAL_SYNC: {
			event.waitUntil(initialSync().then(x => {
				self.worker.log('Sync event result:', x);
			}));
			break;
		}
		case syncEvents.UPDATE_SYNC: {
			event.waitUntil(updateSync(self.baseUrl).then(x => {
				self.worker.log('Sync event result:', x);
			}));
			break;
		}
		default: {
			self.worker.log('Received sync event:', event.tag);
			break;
		}
	}
});

self.addEventListener(self.events.PERIODIC_SYNC, (event) => {
	self.worker.log('Triggered periodic sync:', event);

	switch(event.tag) {
		case syncEvents.CONTENT_SYNC: {
			event.waitUntil(contentSync().then(x => {
				self.worker.log('Sync event result:', x);
			}));
			break;
		}
		default: {
			self.worker.log('Received sync event:', event.tag);
			break;
		}
	}
});