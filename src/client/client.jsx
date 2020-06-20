
import ReactDOM from 'react-dom';
import configureStore from './stores/store';
import { loadableReady } from '@loadable/component';
import { register } from './scriptsjs/serviceWorker';
import './resources/images/favicon.ico';
import './resources/images/icons/touch-icon.png';
import { client } from './views';

loadableReady(() => {

	const initialState = window.__REDUX_STATE__ || {};
	const renderOptions = window.__RENDER_OPTIONS__ || {};
	
	const useRender = (module.hot || renderOptions.isCSR);
	
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
});

register({ 
	watchConnnectionState: false,
	registerPushNotifications: false,
	registerBackgroundSync: false
});

if (module.hot) module.hot.accept();