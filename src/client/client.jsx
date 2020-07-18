
import ReactDOM from 'react-dom';
import configureStore from './stores/store';
import { registerWorker } from '../workers/helpers/register.helper';
import { loadableReady } from '@loadable/component';
import './resources/images/favicon.ico';
import './resources/images/icons/touch-icon.png';
import { client } from './views';

const initialState = window.__PRELOADED_STATE__ || {};
const renderOptions = window.__RENDER_OPTIONS__ || {};

delete window.__PRELOADED_STATE__;
delete window.__RENDER_OPTIONS__;

const insertCss = (...styles) => {
	const removeCss = styles.map(style => style._insertCss());
	return () => removeCss.forEach(dispose => dispose());
};

loadableReady(() => {
	const renderMethod = (renderOptions.clientSideRendered || module.hot) ? ReactDOM.render : ReactDOM.hydrate;

	const store = configureStore(initialState);
	const content = document.getElementById('content');

	renderMethod(
		client(window.location.pathname, store, renderOptions.context, insertCss),
		content
	);

	document.getElementById('serverCSS')?.remove();

	if (renderOptions.enableSW == true) {
		registerWorker({ 
			clientSideRendered: renderOptions.clientSideRendered,
			watchConnnectionState: renderOptions.watchConnection,
			registerPushNotifications: false,
			registerBackgroundSync: false
		});
	}	
	if (module.hot) {
		module.hot.accept();
	}
});