import React from 'react';
import Application from '../components/App';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Provider } from 'react-redux';
import { StaticRouter, BrowserRouter } from 'react-router';

export const client = (store, insertCss, window) => (
	<Provider store={store} suppressHydrationWarning={true}>
		<BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
			<StyleContext.Provider value={{ insertCss }}>
				<Application location={window.location.pathname} />
			</StyleContext.Provider>
		</BrowserRouter>
	</Provider>
);

export const server = (url, store, context, insertCss) => (
	<Provider store={store}>
		<StaticRouter onUpdate={() => window.scrollTo(0, 0)} location={url} context={context}>
			<StyleContext.Provider value={{ insertCss }}>
				<Application location={url} />
			</StyleContext.Provider>
		</StaticRouter>
	</Provider>
);