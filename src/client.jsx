
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { register } from './client/scriptsjs/serviceWorker';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import Application from './client/components/App';
import configureStore from './client/stores/store';

const initialState = window.__REDUX_STATE__ || null;

delete window.__REDUX_STATE__;

const insertCss = (...styles) => {
	const removeCss = styles.map(style => style._insertCss());
	return () => removeCss.forEach(dispose => dispose());
};

if (initialState != null) {
	const store = configureStore(initialState);

	ReactDOM.hydrate(
		<Provider store={store} suppressHydrationWarning={true}>
			<BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
				<StyleContext.Provider value={{ insertCss }}>
					<Application location={window.location.pathname} />
				</StyleContext.Provider>
			</BrowserRouter>
		</Provider>,
		document.getElementById('content')
	);
} else {

	ReactDOM.hydrate(
		<StyleContext.Provider value={{ insertCss }}>
			<Application location={window.location.pathname} />
		</StyleContext.Provider>,
		document.getElementById('content')
	);
}

register();