import { createStore } from 'redux';
import counterReducer from './modules/user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    counter: counterReducer
});
const store = createStore(rootReducer);

export default store;