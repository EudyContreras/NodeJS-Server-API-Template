
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { Store, createStore, applyMiddleware, compose } from 'redux';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export default function configureStore(initialState: any): Store {
	const middleWare = [thunk];

	if (process.env.NODE_ENV !== 'production') {
		middleWare.push(require('redux-immutable-state-invariant').default());
	}

	const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(...middleWare))
	);

	return store;
}
