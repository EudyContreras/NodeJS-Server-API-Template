import ReactDOM from 'react-dom';
import configureStore from './stores/store';
import { registerWorker } from '../workers/helpers/register.helper';
import { registerLazyImageLoading } from './appliers/lazy.applier';
import { loadableReady } from '@loadable/component';
import './resources/images/icons/favicon.ico';
import './resources/images/touch_icon.png?sizes[]=72,sizes[]=96,sizes[]=120,sizes[]=128,sizes[]=144,sizes[]=152,sizes[]=192,sizes[]=257,sizes[]=384,sizes[]=512';
import { client } from './views';

const initialState = window.__PRELOADED_STATE__ || {};
const renderOptions = window.__RENDER_OPTIONS__ || {};

delete window.__PRELOADED_STATE__;
delete window.__RENDER_OPTIONS__;

const insertCss = (...styles) => {
	const removeCss = styles.map((style) => style._insertCss());
	return () => removeCss.forEach((dispose) => dispose());
};

loadableReady(() => {
	const renderMethod = renderOptions.clientSideRendered || module.hot ? ReactDOM.render : ReactDOM.hydrate;

	const store = configureStore(initialState);
	const content = document.getElementById('content');

	renderMethod(client(window.location.pathname, store, renderOptions.context, insertCss), content);

	registerLazyImageLoading();

	const element = document.getElementById('serverCSS');

	if (element) {
		element.parentNode.removeChild(element);
	}
	if (renderOptions.enableSW === true) {
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
