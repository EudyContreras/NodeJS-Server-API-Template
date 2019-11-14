export const LOADING_REPORTS = 'LOADING_REPORT'
export const GET_ALL_REPORTS = 'GET_ALL_REPORTS'
export const GET_REPORT = 'GET_REPORT'

export const getReport = (id) => {
   return {
      type: GET_REPORT
   };
}

export const getAllReports = () => {
   return {
      type: GET_ALL_REPORTS
   };
}

export const setReportsLoading = () => {
   return {
      type: LOADING_REPORTS
   };
}

