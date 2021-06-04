import { applyMiddleware, combineReducers, createStore } from 'redux';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'UPDATE':
      const newState = { ...state };
      for (const prop in action.data) {
        newState.userData[prop] = action.data[prop];
      }
      return newState;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

const sessionStorageMiddleware = (store) => (next) => (action) => {
  let result = next(action);
  sessionStorage.setItem('session', JSON.stringify(store.getState()));
  return result;
};

const store = createStore(
  combineReducers({
    user: userReducer,
  }),
  JSON.parse(sessionStorage.getItem('session')) || {},
  applyMiddleware(sessionStorageMiddleware)
);

export default store;
