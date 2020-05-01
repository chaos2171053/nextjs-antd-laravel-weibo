import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import AppConfig from '../config/config';

import Router from 'next/router'
import { logout } from '../store/modules/user';
import { getValue } from '../utils/localstorage';
export interface ResponseData<T> {
    code: number;

    data: T;

    message: string;
}

interface IPropsRequest extends AxiosRequestConfig {
    cookies?: any;
    isServer?: boolean;
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
    (config: AxiosRequestConfig) => {
        const token = getValue('Token');
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
        let errors = []
        let errMessages = []
        if (!response.data) {
            return Promise.resolve(response);
        }

        // 登录已过期或者未登录
        if (response.data.code === 401) {
            logout()
            Router.replace(`/signin?redirectURL=${encodeURIComponent(window.location.href)}`)
            return Promise.reject(new Error(response.data.message));

        }
        // 请求成功
        if (response.data.code === 200) {
            return response.data as any;
        }
        Object.keys(response.data.data).map(err => errors.push(response.data.data[err]))
        console.error(errors);
        return Promise.reject(errors);
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);


// 统一发起请求
export function request<T>(options: IPropsRequest) {
    const { isServer = false, cookies = {} } = options
    if (isServer) {
        // TODO 如果是服务端，把 config.headers.Authorization = `Bearer ${token}`; 里面的token从cookie里面取
        options.headers.cookies = cookies
    }
    return axios.request<T>(options);
}
