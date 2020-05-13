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
export function apiUpdateUserPwd(id: number, data: IUser) {
    return request({
        method: 'put',
        url: '/api/v1/users/' + id,
        data,
    });
}


