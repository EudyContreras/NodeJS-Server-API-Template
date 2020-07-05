
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { Store, createStore, applyMiddleware, compose } from 'redux';
import IAction from '../actions/action';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export default function configureStore(initialState: any): Store<any, IAction> {
	const middleWare = [thunk];
	
	const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(...middleWare))
	);

	return store;
}
