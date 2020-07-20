import { EventEmitter } from 'events';

const swMessageBus = new EventEmitter();

swMessageBus.on('message', (message) => {
	if ('serviceWorker' in navigator) {
		if (navigator.serviceWorker.controller != null) {
			navigator.serviceWorker.controller.postMessage(message);
		}
	}
});

export default swMessageBus;
