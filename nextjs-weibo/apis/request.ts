import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import AppConfig from '../config/config';

import Router from 'next/router'
import { logout } from '../store/modules/user';
import { getValue } from '../utils/localstorage';
import { getCookieVal } from '../utils/cookie';
export interface ResponseData<T> {
    code: number;

    data: T;

    message: string;
}

interface IPropsRequest extends AxiosRequestConfig {
    ctx?: any;
    options?: any;
}


axios.defaults.timeout = 3000;
axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json'
};

// 请求地址
axios.defaults.baseURL = AppConfig.hosts.api;
// 打开cookie
// axios.defaults.withCredentials = true
// 请求拦截器
axios.interceptors.request.use(
    (config: IPropsRequest) => {
        let token;
        if (process.browser) {
            token = getValue('Token');
        } else {
            token = getCookieVal(config.ctx, {
                decode: decodeURIComponent
            }).Token
        }
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

// 响应拦截

axios.interceptors.response.use(
    (response: AxiosResponse<ResponseData<any>>) => {
        let errors = ''
        // 登录已过期或者未登录
        if (response.data.code === 401) {
            logout()
            Router.replace(`/signin?redirectURL=${encodeURIComponent(window.location.href)}`)
            return Promise.reject(new Error(response.data.message));

        }
        // 请求成功
        if (response.data.code === 200) {
            return response.data.data as any;
        }
        Object.keys(response.data.data).map(err => errors += ` ${err}: ${response.data.data[err]}`)
        console.error(errors);
        return Promise.reject(errors);
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);


// 统一发起请求
export function request<T>(options: IPropsRequest) {
    return axios.request<T>(options);
}
