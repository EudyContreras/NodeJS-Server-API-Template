import axios from 'axios';

import { 
   LOADING_REPORTS,
   GET_ALL_REPORTS, 
   GET_REPORT
} from './types';

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

