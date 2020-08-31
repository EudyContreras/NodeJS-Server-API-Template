import ReactDOM from 'react-dom';
import configureStore, { StoreInitialState } from './stores/store';
import FontFaceObserver from 'fontfaceobserver';
import { registerWorker } from '../workers/helpers/register.helper';
import { registerLazyImageLoading } from './appliers/lazy.applier';
import { loadableReady } from '@loadable/component';
import { client } from './views';
import { MaterialIcons } from './stores/icon.library';
import './resources/images/icons/favicon.ico';
import './resources/images/touch_icon.png?sizes[]=72,sizes[]=128,sizes[]=144,sizes[]=152,sizes[]=192,sizes[]=257,sizes[]=384,sizes[]=512';
import { IStateTree } from './reducers';

const initialState: IStateTree = window.__PRELOADED_STATE__ || StoreInitialState;
const renderOptions: any = window.__RENDER_OPTIONS__ || {};

delete window.__PRELOADED_STATE__;
delete window.__RENDER_OPTIONS__;

const insertCss = (...styles: any[]): any => {
	const removeCss = styles.map((style) => style._insertCss());
	return (): any => removeCss.forEach((dispose) => dispose());
};

const clientSideRendered = renderOptions.clientSideRendered;
const materialFontsObserver = new FontFaceObserver(MaterialIcons.name, {});

materialFontsObserver
	.load(null, 5000)
	.then(() => {
		const reccord = { [MaterialIcons.name as string]: true };
		initialState.presentation.assets.fonts = { ...reccord };

		if (!clientSideRendered) {
			setTimeout(() => {
				registerLazyImageLoading({
					useNativeLoading: false,
					loadBelowFold: false,
					decodeImages: true
				});
			}, 250);
		}
	})
	.catch((error) => {
		console.log('Something went wrong!', error);
	});

const render = (): any => {
	const store = configureStore(initialState);
	const content = document.getElementById('content');
	const element = document.getElementById('serverCSS');

	const renderMethod = clientSideRendered || module.hot ? ReactDOM.render : ReactDOM.hydrate;

	const clientFunc = client({ url: window.location.pathname, store: store, insertCss: insertCss });

	renderMethod(clientFunc, content);

	if (clientSideRendered) {
		registerLazyImageLoading({
			useNativeLoading: false,
			loadBelowFold: false,
			decodeImages: true
		});
	}

	if (element) {
		element?.parentNode?.removeChild(element);
	}

	if (renderOptions.enableSW === true) {
		registerWorker({
			clientSideRendered: clientSideRendered,
			watchConnnectionState: renderOptions.watchConnection,
			registerPushNotifications: false,
			registerBackgroundSync: false
		});
	}
	if (module.hot) {
		module.hot.accept();
	}
};

if (clientSideRendered) {
	render();
} else {
	loadableReady(render);
};
