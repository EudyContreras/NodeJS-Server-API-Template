import ReactDOM from 'react-dom';
import configureStore from './stores/store';
import FontFaceObserver from 'fontfaceobserver';
import { registerWorker } from '../workers/helpers/register.helper';
import { registerLazyImageLoading } from './appliers/lazy.applier';
import { loadableReady } from '@loadable/component';
import './resources/images/icons/favicon.ico';
import './resources/images/touch_icon.png?sizes[]=72,sizes[]=128,sizes[]=144,sizes[]=152,sizes[]=192,sizes[]=257,sizes[]=384,sizes[]=512';
import { client } from './views';
import { MaterialIcons } from './stores/icon.library';

const initialState: any = window.__PRELOADED_STATE__ || {};
const renderOptions: any = window.__RENDER_OPTIONS__ || {};

delete window.__PRELOADED_STATE__;
delete window.__RENDER_OPTIONS__;

const insertCss = (...styles: any[]): any => {
	const removeCss = styles.map((style) => style._insertCss());
	return (): any => removeCss.forEach((dispose) => dispose());
};

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver(MaterialIcons.name, {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver
	.load(null, 5000)
	.then(() => {
		[].slice.call(document.querySelectorAll(`.${MaterialIcons.class}`)).forEach((el: HTMLElement) => {
			el.style.opacity = '1';
		});
	})
	.catch((error) => {
		console.log('Something went wrong!', error);
	});

loadableReady(() => {
	const renderMethod = renderOptions.clientSideRendered || module.hot ? ReactDOM.render : ReactDOM.hydrate;

	const store = configureStore(initialState);
	const content = document.getElementById('content');
	const element = document.getElementById('serverCSS');

	renderMethod(client(window.location.pathname, store, renderOptions.context, insertCss), content);

	if (element) {
		element?.parentNode?.removeChild(element);
	}
	registerLazyImageLoading({
		useNativeLoading: false,
		loadBelowFold: false,
		decodeImages: true
	});

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
