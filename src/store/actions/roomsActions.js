import axios from 'axios';

export const fetchRooms = () => async dispatch => {
  dispatch({ type: 'FETCH_ROOMS_REQUEST' });
  try {
    const res = await axios.get('/rooms');
    dispatch({ type: 'FETCH_ROOMS_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'FETCH_ROOMS_FAILURE', payload: err.message });
  }
};
