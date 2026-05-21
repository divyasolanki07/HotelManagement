import axios from 'axios';

export const fetchReservations = () => async dispatch => {
  dispatch({ type: 'FETCH_RESERVATIONS_REQUEST' });
  try {
    const res = await axios.get('/reservations');
    dispatch({ type: 'FETCH_RESERVATIONS_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'FETCH_RESERVATIONS_FAILURE', payload: err.message });
  }
};

export const addReservation = (reservation) => async dispatch => {
  try {
    const res = await axios.post('/reservations', reservation);
    dispatch({ type: 'ADD_RESERVATION_SUCCESS', payload: res.data });
  } catch (err) {
    // handle
  }
};

export const updateReservation = (id, data) => async dispatch => {
  try {
    const res = await axios.put(`/reservations/${id}`, data);
    dispatch({ type: 'UPDATE_RESERVATION_SUCCESS', payload: res.data });
  } catch (err) {}
};

export const deleteReservation = (id) => async dispatch => {
  try {
    await axios.delete(`/reservations/${id}`);
    dispatch({ type: 'DELETE_RESERVATION_SUCCESS', payload: id });
  } catch (err) {}
};
