const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function roomsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ROOMS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_ROOMS_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ROOMS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
