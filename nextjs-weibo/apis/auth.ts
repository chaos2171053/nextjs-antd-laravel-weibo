import { request } from "./request";

export interface IUser {
    name: string;
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
