import RoutingService from '../../services/routings.service';
import IAction from '../action';

export const LOADING_ROUTINGS = 'LOADING_ROUTINGS';
export const GET_ALL_ROUTINGS = 'GET_ALL_ROUTINGS';
export const ERROR_EVENT = 'ROUTINGS_ERROR';

export const getAllRoutings = () => async (dispatch: (action?: IAction) => any): Promise<void> => {
	dispatch(loading());

	const service = new RoutingService();

	const { error, routings } = await service.getAll();

	if (error) return dispatch(onError(error));

	dispatch({
		type: GET_ALL_ROUTINGS,
		payload: routings
	});
};

export const loading = (): any => ({
	type: LOADING_ROUTINGS
});

export const onError = (error: any): any => ({
	type: ERROR_EVENT,
	payload: error
});
