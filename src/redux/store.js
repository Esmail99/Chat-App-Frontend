import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import { messageInput, userInfo, errors } from './reducers'

const rootReducer = combineReducers({ messageInput, userInfo, errors })
const store = createStore(rootReducer, applyMiddleware(logger));


export default store;