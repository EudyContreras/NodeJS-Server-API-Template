export const LOADING_NAVBAR = 'LOADING_REPORT';
export const GET_NAVBAR_ITEMS = 'GET_ALL_REPORTS';

export const getAllReports = () => {
   return {
      type: GET_NAVBAR_ITEMS
   };
};

export const setReportsLoading = () => {
   return {
      type: LOADING_NAVBAR
   };
};

