import get from 'lodash/get';

export const topicsSelector = (state: any) => get(state, ['topicsReducer', 'items']);