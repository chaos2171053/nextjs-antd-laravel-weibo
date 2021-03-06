import { Reducer } from 'redux';
import { setValue, removeValue, getValue } from "../../utils/localstorage";
import { IStoreAction } from "../types";
import { setCookieVal, removeCookieVal } from '../../utils/cookie';
import { setUi } from './ui'
import { apiUerSignInByEmailPwd, apiUerSignUp, apiUpdateUserProfile, apicomfirmUserEmail } from '../../apis/user';
import { platform } from 'os';

// types
const SET_USER_INFO = 'SET_USER_INFO';
const SET_USER_LOGOUT = 'SET_USER_LOGOUT';
const GET_USER_INFO = 'GET_USER_INFO '
const COMFIRM_USER_EMAIL = 'COMFIRM_USER_EMAIL'

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
    activated?: number;
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
    activated: 0
};


// TODO 待优化state中user的层级关系

//Reducer
const userReducer: Reducer<any, IStoreAction<any>> = (
    state = defaultUser, // TODO 这里的state应是全局state，但是被认为是defaultUser
    action: IStoreAction<any>,
) => {
    const { type, payload } = action;
    let userState = {}
    switch (type) {
        case SET_USER_INFO:
            // TODO，待优化，这里写的不好，不适合后续修改userstate，只适合登陆时设置userstate
            setValue('Token', payload.token);
            setValue(USER_KEY, payload);
            setCookieVal({
                ctx: payload.ctx,
                key: 'Token',
                value: payload.token,
                maxAge: payload.expiresIn
            })
            userState = {
                ...state,
                token: payload.token,
                ...payload.userInfo
            }
            setValue(USER_KEY, userState)
            return userState;
        case SET_USER_LOGOUT:
            removeValue('Token');
            removeValue(USER_KEY);
            removeCookieVal({ ctx: null, key: 'Token' })
            // TODO: BUG defaultUser 浅拷贝，尝试Immutable.js
            return {
                ...defaultUser,
            };
        case GET_USER_INFO:
            const user = getValue(USER_KEY, defaultUser)
            return {
                ...user,
            };
        case COMFIRM_USER_EMAIL:
            userState = getValue(USER_KEY)
            userState = {
                ...userState,
                activated: 1
            }
            setValue(USER_KEY, userState)
            return userState
        default:
            return state;
    }
};

//Action Creator
export const setUserInfo: (user) => IStoreAction<UserState> = (user: UserState) => ({
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

export const comfirmUserEmail: () => IStoreAction<UserState> = () => ({
    type: COMFIRM_USER_EMAIL,
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

export const dispatchComfirmUserEmail = (
) => {
    return function (dispatch, getState) {
        dispatch(setUi({
            showToast: false,
            toastMsg: '',
        }))
        return new Promise((resolve, reject) => {
            return apicomfirmUserEmail().then(res => {
                dispatch(setUi({
                    showToast: true,
                    toastMsg: 'Comfirm success',
                }))
                dispatch(comfirmUserEmail())
                resolve(res)
            }).catch(e => {
                dispatch(setUi({ showToast: true, toastMsg: e }))
                reject(e)
            })
        })
    }
}

export default userReducer;