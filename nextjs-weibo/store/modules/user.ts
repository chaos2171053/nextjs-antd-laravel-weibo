import { Reducer } from 'redux';
import { setValue, removeValue, getValue } from "../../utils/localstorage";
import { IStoreAction } from "../types";
import { setCookieVal, removeCookieVal } from '../../utils/cookie';
import { setUi } from './ui'
import { apiUerSignInByEmailPwd, apiUerSignUp, apiUpdateUserProfile } from '../../apis/user';

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

export const USER_KEY = 'nextjs-weibo-user';

const getUserInfoFromrBowser = getValue(USER_KEY)

const defaultUser: UserState = getUserInfoFromrBowser ? getUserInfoFromrBowser : {
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

// asynchronous action
export const dispatchLogin = (user: {
    email: string,
    password: string
}) => {

    return function (dispatch) {
        dispatch(setUi({
            showToast: false,
            toastMsg: '',
        }))
        // return promise to catch http errors.
        return new Promise((resolve, reject) => {
            return apiUerSignInByEmailPwd(user).then(res => {
                dispatch(setUserInfo(res as any))
                resolve(res)
            }).catch(e => {
                dispatch(setUi({ showToast: true, toastMsg: e }))
                reject(e)
            })
        })
    }
}

// asynchronous action
export const dispatchSignUp = (user: {
    name: string;
    email: string;
    password: string;
}) => {
    return function (dispatch) {
        dispatch(setUi({
            showToast: false,
            toastMsg: '',
        }))
        return new Promise((resolve, reject) => {
            return apiUerSignUp(user).then(res => {
                dispatch(setUi({
                    showToast: true,
                    toastMsg: 'Sign up success',
                }))
                resolve(res)
            }).catch(e => {
                dispatch(setUi({ showToast: true, toastMsg: e }))
                reject(e)
            })
        })
    }
}

export const dispatchUpdateUserProfile = (user: {
    name: string;
    email: string;
    password: string;
    id: number;
}) => {
    return function (dispatch) {
        dispatch(setUi({
            showToast: false,
            toastMsg: '',
        }))
        return new Promise((resolve, reject) => {
            return apiUpdateUserProfile(user.id, user).then(res => {
                dispatch(setUi({
                    showToast: true,
                    toastMsg: 'Update success',
                }))
                resolve(res)
            }).catch(e => {
                dispatch(setUi({ showToast: true, toastMsg: e }))
                reject(e)
            })
        })
    }
}

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
            setCookieVal({
                ctx: payload.ctx,
                key: 'Token',
                value: payload.token,
                maxAge: payload.expiresIn
            })
            return {
                ...state,
                token: payload.token,
                id: payload.id,
                email: payload.email
            };
        case SET_USER_LOGOUT:
            removeValue('Token');
            removeValue(USER_KEY);
            removeCookieVal({ ctx: null, key: 'Token' })
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