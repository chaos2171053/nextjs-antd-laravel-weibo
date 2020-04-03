import { Reducer } from 'redux';
import { setValue, removeValue } from "../../utils/localstorage";
import { IStoreAction } from "../types";

const SET_USER_INFO = 'SET_USER_INFO';
const SET_USER_LOGOUT = 'SET_USER_LOGOUT';

export interface UserState {
    id: number;
    token: string;
    created_at?: string;
    updated_at?: string;
    email?: string;
    avatar?: string | undefined;
    mobile?: string;
    role?: number;
}

const USER_KEY = 'nextjs-weibo-user';

const defaultUser: UserState = {
    token: '',
    avatar: undefined,
    email: '',
    mobile: '',
    role: 0,
    id: 0,
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


//Reducer
const userReducer: Reducer<UserState, IStoreAction<any>> = (
    state = defaultUser,
    action: IStoreAction<any>,
) => {
    const { type, payload } = action;

    switch (type) {
        case SET_USER_INFO:
            setValue('token', payload.token);
            setValue(USER_KEY, payload);
            return {
                ...payload,
            };
        case SET_USER_LOGOUT:
            removeValue('token');
            removeValue(USER_KEY);
            return {
                ...defaultUser,
            };
        default:
            return state;
    }
};

export default userReducer;