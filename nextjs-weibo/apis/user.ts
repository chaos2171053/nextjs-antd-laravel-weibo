import { request } from "./request";

export interface IUser {
    name?: string;
    password: string;
    email: string;
}

export function apiUerSignUp(data: IUser) {
    return request({
        method: 'POST',
        url: '/api/v1/users/register',
        data,
    });
}
export function apiUerSignInByEmailPwd(data: IUser) {
    return request({
        method: 'POST',
        url: '/api/v1/users/password-login',
        data,
    });
}
export function apiUpdateUserProfile(id: number, data: IUser) {
    return request({
        method: 'put',
        url: '/api/v1/users/' + id,
        data,
    });
}



export function apiGetUserList({ size = 10, page = 1, ctx = null }: { size?: number; page?: number; ctx?: any }) {
    return request({
        method: 'GET',
        url: `/api/v1/users?page=${page}&size=${size}`,
        ctx: ctx
    });
}

export function apiDestoryUser(id: number) {
    return request({
        method: 'DELETE',
        url: `/api/v1/users/${id}`,
    });
}