
import ReactDOM from 'react-dom';
import configureStore from './stores/store';
import { loadableReady } from '@loadable/component';
import { register } from './scriptsjs/serviceWorker';
import { client } from './views';

loadableReady(() => {

	const initialState = window.__REDUX_STATE__ || {};
	const renderOptions = window.__RENDER_OPTIONS__ || {};
	
	const useRender = (!module.hot || renderOptions.isCSR);
	
	delete window.__REDUX_STATE__;
	delete window.__RENDER_OPTIONS__;

	const renderMethod = useRender ? ReactDOM.render : ReactDOM.hydrate;

	const insertCss = (...styles) => {
		const removeCss = styles.map(style => style._insertCss());
		return () => removeCss.forEach(dispose => dispose());
	};

	const store = configureStore(initialState);
	const content = document.getElementById('content');

	renderMethod(
		client(window.location.pathname, store, insertCss),
		content
	);

	document.getElementById('shellStyle').remove();

	if (renderOptions.enableSW == true) {
		register({ 
			watchConnnectionState: false,
			registerPushNotifications: false,
			registerBackgroundSync: false
		});
	}
});