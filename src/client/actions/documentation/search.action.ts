import SearchService from '../../services/search.service';
import IAction from '../../actions/action';

export const SEARCH_ACTION_SOURCE = 'SEARCH_ACTION_SOURCE';

export const SEARCH_RESULTS = SEARCH_ACTION_SOURCE + 'SEARCH_RESULTS';
export const LOADING_SEARCH_RESULTS = SEARCH_ACTION_SOURCE + 'LOADING_SEARCH_RESULTS';
export const SEARCH_ERROR = SEARCH_ACTION_SOURCE + 'SEARCH_ERROR';

export interface DispatchProps {
	performSearchAction: (prefix: string) => void;
}

export const performSearchAction = (prefix: string) => async (dispatch: (action?: IAction) => any): Promise<void> => {
	dispatch(loading());

	const service = new SearchService();

	const { error, result } = await service.performSearch(prefix);

	if (error) return dispatch(onError(error));

	dispatch(searchAction(result));
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

export const searchAction = (result: any): IAction => ({
	from: SEARCH_ACTION_SOURCE,
	type: SEARCH_RESULTS,
	payload: result
});

export const Dispatchers = { performSearchAction };
