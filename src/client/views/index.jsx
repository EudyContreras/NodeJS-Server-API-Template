import React from 'react';
import Application from '../components/App';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

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