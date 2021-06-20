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
    let newState;
    switch (action.type) {
        case 'fetch/contacts':
            newState = { ...state };
            action.data.forEach((c) => {
                newState[c.user_id_2 + ''] = {
                    id: c.user_id_2,
                    username: c.username2,
                    avatar: c.username2_image,
                    lastMessage: c.lastMessage,
                };
            });
            return newState;
        case 'ADD-CONTACT':
            newState = { ...state };
            newState[action.data.id + ''] = {
                id: action.data.id,
                username: action.data.username,
                avatar: action.data.image,
            };
            return newState;
        case 'LOGOUT':
            return {};
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
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};

const languageReducer = (
    state = {
        language:
            JSON.parse(sessionStorage.getItem('session'))?.language?.language ??
            navigator.language.split('-')[0],
    },
    action
) => {
    switch (action.type) {
        case 'UPDATE/LANGUAGE':
            return action.language;
        default:
            return state;
    }
};

const notificationReducer = (
    state = { messages: 0, bids: 0, reviews: 0, sales: 0 },
    action
) => {
    let newState = {};
    switch (action.type) {
        case 'noti/messages':
            newState = { ...state };
            newState['messages'] = action['noti/messages'];
            return newState;
        case 'noti/bids':
            newState = { ...state };
            newState['bids'] = action['noti/bids'];
            console.log('bids', newState);
            return newState;
        case 'noti/reviews':
            newState = { ...state };
            newState['reviews'] = action['noti/reviews'];
            console.log('reviews', newState);
            return newState;
        case 'noti/sales':
            newState = { ...state };
            newState['sales'] = action['noti/sales'];
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
        language: languageReducer,
        notifications: notificationReducer,
    }),
    JSON.parse(sessionStorage.getItem('session')) || {},
    applyMiddleware(sessionStorageMiddleware)
);

export default store;
