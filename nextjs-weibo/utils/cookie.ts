// import cookie from 'js-cookie';
import { setCookie, destroyCookie, parseCookies } from 'nookies'
export const setCookieVal = ({ ctx = null, key = '', value = '', maxAge = '', path = '', ...others }) => {
    setCookie(ctx, key, value, {
        maxAge,
        path,
        ...others
    })
};

export const removeCookieVal = ({ ctx = null, key }) => {
    destroyCookie(ctx, key)
};

export const getCookieVal = (ctx = null, options) => {
    return parseCookies(ctx, options)
};

// const getCookieFromBrowser = key => {
//     return cookie.get(key);
// };

// const getCookieFromServer = (key, req) => {
//     if (!req.headers.cookie) {
//         return undefined;
//     }
//     const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
//     if (!rawCookie) {
//         return undefined;
//     }
//     return rawCookie.split('=')[1];
// };