import { Reducer } from 'redux';
import { setValue, removeValue, getValue } from "../../utils/localstorage";
import { IStoreAction } from "../types";

// types
const SET_USER_INFO = 'SET_USER_INFO';
const SET_USER_LOGOUT = 'SET_USER_LOGOUT';
const GET_USER_INFO = 'GET_USER_INFO '

export interface UserState {
    id?: number;
    name?: string;
    email?: string;
    token?: string;
    created_at?: string;
    updated_at?: string;
    avatar?: string | undefined;
    mobile?: string;
    role?: number;
    password?: string;
}

const USER_KEY = 'nextjs-weibo-user';

const defaultUser: UserState = {
    token: null,
    avatar: null,
    email: null,
    mobile: null,
    role: 0,
    id: 0,
    password: null,
    name: null,
};

//Action Creator
export const setUserInfo: (user: UserState) => IStoreAction<UserState> = (user: UserState) => ({
    type: SET_USER_INFO,
    payload: user,
});

export const logout: () => IStoreAction<null> = () => ({
    type: SET_USER_LOGOUT,
    payload: null,
});

export const getUserInfo: () => IStoreAction<UserState> = () => ({
    type: GET_USER_INFO,
    payload: null,
})

//Reducer
const userReducer: Reducer<UserState, IStoreAction<any>> = (
    state = defaultUser,
    action: IStoreAction<any>,
) => {
    const { type, payload } = action;

    switch (type) {
        case SET_USER_INFO:
            setValue('Token', payload.token);
            setValue(USER_KEY, payload);
            return {
                ...payload,
            };
        case SET_USER_LOGOUT:
            removeValue('Token');
            removeValue(USER_KEY);
            // TODO 
            return {
                ...defaultUser,
            };
        case GET_USER_INFO:
            const user = getValue(USER_KEY, defaultUser)
            return {
                ...user,
            };
        default:
            return state;
    }
};

export default userReducer;