import {
	SEARCH_ACTION_SOURCE,
	LOADING_SEARCH_RESULTS,
	SEARCH_ERROR,
	SEARCH_RESULTS
} from '../../actions/documentation/search.action';

import IAction from '../../actions/action';

export const SOURCE = SEARCH_ACTION_SOURCE;

export interface ISearchEvent{
	searchResults: {
		prefix: string;
		results: string[];
	};
	isLoading: boolean;
	error?: any | undefined | null;
}

export const InitialState: ISearchEvent = {
	searchResults: {
		prefix: '',
		results: []
	},
	isLoading: false,
	error: null
};

export default function (state = InitialState, action: IAction): ISearchEvent {
	switch (action.type) {
		case SEARCH_RESULTS: {
			return {
				...state,
				isLoading: true,
				searchResults: action.payload
			};
		}
		case LOADING_SEARCH_RESULTS: {
			return {
				...state,
				isLoading: true
			};
		}
		case SEARCH_ERROR: {
			return {
				...state,
				isLoading: false,
				error: action.payload
			};
		}
		default: return state;
	}
}
