

window.__REDUX_STATE__ = props.state;

window.onload = function () {
	document.getElementById('robotoFont').removeAttribute('disabled');
	document.getElementById('materialIcons').removeAttribute('disabled');
}

if (props.enableSW) {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
				//  registration.pushManager.subscribe({userVisibleOnly: true});
			}, function (err) {
				console.log('ServiceWorker registration failed: ', err);
			}).catch(error => console.log(error));
		});
	}
}