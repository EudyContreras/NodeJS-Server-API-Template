const initialState = { items: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Topics/UPDATE_TOPICS':
      return {
        ...state,
        items: action.items
      };
    default:
      return state;
  }
};