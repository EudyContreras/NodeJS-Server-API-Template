
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { register } from './scriptsjs/serviceWorker';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import Application from './components/App';
import configureStore from './stores/store';
import { loadableReady } from '@loadable/component';

const initialState = window.__REDUX_STATE__ || {};

delete window.__REDUX_STATE__;

loadableReady(() => {
	const insertCss = (...styles) => {
		const removeCss = styles.map(style => style._insertCss());
		return () => removeCss.forEach(dispose => dispose());
	};
	
	const store = configureStore(initialState);
	const content = document.getElementById('content');

	ReactDOM.hydrate(
		<Provider store={store} suppressHydrationWarning={true}>
			<BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
				<StyleContext.Provider value={{ insertCss }}>
					<Application location={window.location.pathname} />
				</StyleContext.Provider>
			</BrowserRouter>
		</Provider>,
		content
	);

	document.getElementById('shellStyle').remove();

	register();
});