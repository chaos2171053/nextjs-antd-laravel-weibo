import { request } from "./request";

interface IUser {
    name: string;
    password: string;
    email: string;
}

export function apiUerSignIn(data: IUser) {
    return request({
        method: 'POST',
        url: '/api/v1/sign_in',
        data,
    });
}
