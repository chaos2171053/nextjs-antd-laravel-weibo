import { request } from "./request";


export function apiGetStatusListByUserId({ size = 10, page = 1, ctx = null, id }: { size?: number; page?: number; ctx?: any; id: number }) {
    return request({
        method: 'GET',
        url: `/api/v1/users/${id}/status?page=${page}&size=${size}`,
        ctx: ctx
    });
}

export function postWeibo(data: { content: string }) {
    return request({
        method: 'POST',
        url: `/api/v1/statuses`,
        data
    });
}