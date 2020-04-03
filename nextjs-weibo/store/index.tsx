import { createStore, Reducer, Middleware, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from './modules/user';
import { combineReducers } from 'redux';
import { IStoreState, IStoreAction } from './types';


const reducers: Reducer<IStoreState, IStoreAction<any>> = combineReducers<IStoreState>({
    user: userReducer,
});
const middleware: Middleware[] = [reduxThunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(reduxLogger);
}


function createMyStore() {
    /* eslint-disable no-underscore-dangle */
    return createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));
}
const store = createMyStore();
export default store;