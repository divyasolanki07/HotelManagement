import axios from 'axios';

export const login = (username, password) => async dispatch => {
  try {
    const res = await axios.get(`/users?username=${username}&password=${password}`);
    if (res.data && res.data.length > 0) {
      const user = res.data[0];
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('user');
  dispatch({ type: 'LOGOUT' });
};
