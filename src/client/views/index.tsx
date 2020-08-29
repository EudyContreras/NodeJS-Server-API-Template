/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import configureStore from '../stores/store';
import Application from '../components/App';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Provider } from 'react-redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApplicationTheme } from '../styles/themes/ApplicationTheme';
import { IStateTree } from '../reducers';
import { Store } from 'redux';
import IAction from '../actions/action';

type Props = {
	url: string,
	css?: any,
	context?: any,
	store: Store<IStateTree, IAction>,
	insertCss: Function
};

export const appLight = ({ url, css, context }: Props): JSX.Element => {
	const styling = new Set([css]);
	const insertCss = (...styles): void => styles.forEach((style) => styling.add(style._getCss()));

	return (
		<Provider store={configureStore({})}>
			<StaticRouter location={url} context={context}>
				<StyleContext.Provider value={{ insertCss }}>
					<ThemeProvider theme={ApplicationTheme}>
						<Application location={url} history={history} />
					</ThemeProvider>
				</StyleContext.Provider>
			</StaticRouter>
		</Provider>
	);
};

export const application = ({ url, store, context, insertCss }: Props): JSX.Element => {
	const history = createMemoryHistory();
	return (
		<Provider store={store}>
			<StaticRouter location={url} context={context}>
				<StyleContext.Provider value={{ insertCss }}>
					<ThemeProvider theme={ApplicationTheme}>
						<Application location={url} history={history} />
					</ThemeProvider>
				</StyleContext.Provider>
			</StaticRouter>
		</Provider>
	);
};

export const client = ({ url, store, insertCss }: Props): JSX.Element => {
	const history = createBrowserHistory();
	return (
		<Provider store={store}>
			<BrowserRouter>
				<StyleContext.Provider value={{ insertCss }}>
					<ThemeProvider theme={ApplicationTheme}>
						<Application location={url} history={history} />
					</ThemeProvider>
				</StyleContext.Provider>
			</BrowserRouter>
		</Provider>
	);
};
