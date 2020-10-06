import thunk from 'redux-thunk';
import rootReducer, { IStateTree, InitialState } from '../reducers';
import { Store, createStore, applyMiddleware, compose } from 'redux';
import IAction from '../actions/action';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export const StoreInitialState = InitialState;

export default function configureStore(initialState: IStateTree | any = InitialState): Store<IStateTree, IAction> {
	const middleWare = [thunk];

	const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

	const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleWare)));

	return store;
}
