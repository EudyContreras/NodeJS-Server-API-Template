import RoutingService from '../services/routings.service';

export const LOADING_ROUTINGS = 'LOADING_ROUTINGS';
export const GET_ALL_ROUTINGS = 'GET_ALL_ROUTINGS';
export const ERROR_EVENT = 'ROUTINGS_ERROR';

export const getAllRoutings = () => async (dispatch:Function) => {
   dispatch(loading());

   const service = new RoutingService();
   
   const { error, routings } = await service.getAll();
   
   if (error) return dispatch(onError(error));

   dispatch({
      type: GET_ALL_ROUTINGS,
      payload: routings
   });
};

export const loading = () => {
   return {
      type: LOADING_ROUTINGS
   };
};

export const onError = (error: any) => {
   return {
      type: ERROR_EVENT,
      payload: error
   };
};

