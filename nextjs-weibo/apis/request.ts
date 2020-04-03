import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
// import { message, Modal } from 'antd';
import AppConfig from '../config/config';
import { getValue } from '../utils/localstorage'
import Router from 'next/router'
// import store from '../store/index';
// import { logout } from '../store/module/user';
// import { clearSideBarRoutes } from '../store/module/app';
export interface ResponseData<T> {
    code: number;

    data: T;

    message: string;
}


// 指定 axios 请求类型
axios.defaults.timeout = 3000;
axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

// 指定请求地址
axios.defaults.baseURL = AppConfig.hosts.api;
// 添加请求拦截器
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getValue('token');
        // 获取用户token，用于校验
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

// 添加响应拦截器，拦截登录过期或者没有权限

axios.interceptors.response.use(
    (response: AxiosResponse<ResponseData<any>>) => {
        if (!response.data) {
            return Promise.resolve(response);
        }

        // 登录已过期或者未登录
        if (response.data.code === 401) {
            // TODO use redux to logout
            // dispatch logout()
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

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
    return axios.request<T>(options);
}
