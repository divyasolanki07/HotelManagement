import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import roomsReducer from './reducers/roomsReducer';
import reservationsReducer from './reducers/reservationsReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  reservations: reservationsReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
