
import ReactDOM from 'react-dom';
import { register } from './scriptsjs/serviceWorker';
import configureStore from './stores/store';
import { loadableReady } from '@loadable/component';
import { client } from './views';

const reactRender = module.hot ? ReactDOM.render : ReactDOM.hydrate;

loadableReady(() => {
	const initialState = window.__REDUX_STATE__ || {};
	const renderOptions = window.__RENDER_OPTIONS__ || {};

	delete window.__REDUX_STATE__;

	const insertCss = (...styles) => {
		const removeCss = styles.map(style => style._insertCss());
		return () => removeCss.forEach(dispose => dispose());
	};
	
	const store = configureStore(initialState);
	const content = document.getElementById('content');

	reactRender(
		client(window.location.pathname, store, insertCss),
		content
	);

	document.getElementById('shellStyle').remove();

	if (renderOptions.enableSW == true) {
		register();
	}
});