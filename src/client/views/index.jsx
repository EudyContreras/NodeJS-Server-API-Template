import React from 'react';
import configureStore from '../stores/store';
import Application from '../components/App';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Provider } from 'react-redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
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

export const appLight = (url, css, context) => {
	const styling = new Set([css]);
	const cssInjector = (...styles) => styles.forEach(style => styling.add(style._getCss()));

	return (
		<Provider store={configureStore({})}>
			<StaticRouter onUpdate={() => window.scrollTo(0, 0)} location={url} context={context}>
				<StyleContext.Provider value={{ cssInjector }}>
					<Application location={url} />
				</StyleContext.Provider>
			</StaticRouter>
		</Provider>
	);
};

export const application = (url, store, context, insertCss) => {
	const history = createMemoryHistory();
	return (
		<Provider store={store} suppressHydrationWarning={true}>
			<StaticRouter onUpdate={() => window.scrollTo(0, 0)} location={url} context={context}>
				<StyleContext.Provider value={{ insertCss }}>
					<Application location={url} history={history} insertCss={insertCss}/>
				</StyleContext.Provider>
			</StaticRouter>
		</Provider>
	);
};

export const client = (url, store, insertCss) => {
	const history = createBrowserHistory();
	return (
		<Provider store={store} suppressHydrationWarning={true}>
			<BrowserRouter onUpdate={() => window.scrollTo(0, 0)} location={url}>
				<StyleContext.Provider value={{ insertCss }}>
					<Application location={url} history={history}/>
				</StyleContext.Provider>
			</BrowserRouter>
		</Provider>
	);
};