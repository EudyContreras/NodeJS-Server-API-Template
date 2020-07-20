import SearchService from '../../services/search.service';
import IAction from '../../actions/action';

export const SEARCH_ACTION_SOURCE = 'SEARCH_ACTION_SOURCE';

export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const LOADING_SEARCH_RESULTS = 'LOADING_SEARCH_RESULTS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export interface DispatchProps {
	performSearch: (prefix: string) => void;
}

export const performSearch = (prefix: string) => async (dispatch: Function): Promise<void> => {
	dispatch(loading());

	const service = new SearchService();

	const { error, result } = await service.performSearch(prefix);

	if (error) return dispatch(onError(error));

	dispatch(searchEvent(result));
};

export const loading = (): IAction => ({
	from: SEARCH_ACTION_SOURCE,
	type: LOADING_SEARCH_RESULTS
});

export const onError = (error: any): IAction => ({
	from: SEARCH_ACTION_SOURCE,
	type: SEARCH_ERROR,
	payload: error
});

export const searchEvent = (result: any): IAction => ({
	from: SEARCH_ACTION_SOURCE,
	type: SEARCH_RESULTS,
	payload: result
});

export const Dispatchers = { performSearch };
