const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function reservationsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_RESERVATIONS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_RESERVATIONS_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_RESERVATIONS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_RESERVATION_SUCCESS':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_RESERVATION_SUCCESS':
      return {
        ...state,
        items: state.items.map(r => (r.id === action.payload.id ? action.payload : r))
      };
    case 'DELETE_RESERVATION_SUCCESS':
      return { ...state, items: state.items.filter(r => r.id !== action.payload) };
    default:
      return state;
  }
}
