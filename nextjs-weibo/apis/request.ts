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



axios.defaults.timeout = 3000;
axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

// 请求地址
axios.defaults.baseURL = AppConfig.hosts.api;
// 请求拦截器
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getValue('Token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

// 响应拦截

axios.interceptors.response.use(
    (response: AxiosResponse<ResponseData<any>>) => {
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
        return Promise.reject(new Error(response.data.message));
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

// 统一发起请求
export function request<T>(options: AxiosRequestConfig) {
    return axios.request<T>(options);
}
