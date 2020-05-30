
import ReactDOM from 'react-dom';
import { register } from './scriptsjs/serviceWorker';
import configureStore from './stores/store';
import { loadableReady } from '@loadable/component';
import { application } from './views';

const reactRender = module.hot ? ReactDOM.render : ReactDOM.hydrate;

loadableReady(() => {
	const initialState = window.__REDUX_STATE__ || {};
	const context = window.__CONTEXT__ || {};

	delete window.__REDUX_STATE__;

	const insertCss = (...styles) => {
		const removeCss = styles.map(style => style._insertCss());
		return () => removeCss.forEach(dispose => dispose());
	};
	
	const store = configureStore(initialState);
	const content = document.getElementById('content');

	ReactDOM.hydrate(
		application(window.location.pathname, store, context, insertCss),
		content
	);

	document.getElementById('shellStyle').remove();

	register();
});