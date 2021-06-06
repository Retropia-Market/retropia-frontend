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
      return {};
    default:
      return state;
  }
};

const contactReducer = (state = {}, action) => {
  switch (action.type) {
    case 'fetch/contacts':
      const newState = { ...state };
      action.data.forEach((c) => {
        newState[c.user_id_2 + ''] = {
          id: c.user_id_2,
          username: c.username2,
          avatar: c.username2_image,
          lastMessage: c.lastMessage,
        };
      });
      return newState;
    default:
      return state;
  }
};

const messageReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case 'fetch/messages':
      newState = { ...state };
      newState[action.data.user] = action.data.messages;
      return newState;
    case 'ws/message':
      console.log(action);
      const target =
        action.me === action.message.src_id
          ? action.message.dst_id
          : action.message.src_id;
      newState = { ...state };
      newState[target + ''] = [
        action.message,
        ...(newState[target + ''] || []),
      ];
      return newState;
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
    contacts: contactReducer,
    messages: messageReducer,
  }),
  JSON.parse(sessionStorage.getItem('session')) || {},
  applyMiddleware(sessionStorageMiddleware)
);

export default store;
