import React from 'react';
import Application from '../components/App';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

export const shell = (url, store, context, insertCss) => (
	<Provider store={store}>
		<StaticRouter onUpdate={() => window.scrollTo(0, 0)} location={url} context={context}>
			<StyleContext.Provider value={{ insertCss }}>
				<Application location={url} />
			</StyleContext.Provider>
		</StaticRouter>
	</Provider>
);

export const application = (url, store, context, insertCss) => (
	<Provider store={store} suppressHydrationWarning={true}>
		<StaticRouter onUpdate={() => window.scrollTo(0, 0)} location={url} context={context}>
			<StyleContext.Provider value={{ insertCss }}>
				<Application location={url} />
			</StyleContext.Provider>
		</StaticRouter>
	</Provider>
);

export const client = (url, store, insertCss) => (
	<Provider store={store} suppressHydrationWarning={true}>
		<BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
			<StyleContext.Provider value={{ insertCss }}>
				<Application location={url} />
			</StyleContext.Provider>
		</BrowserRouter>
	</Provider>
);