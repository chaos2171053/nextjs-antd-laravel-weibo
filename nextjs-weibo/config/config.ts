interface IConfig {
    AppName: string;
    hosts: { [key: string]: string };
    theme: {
        title: string;
        keywords: string;
        description: string;
        url: string;
        subTitle: string;
        avatar: string;
        author: string;
        authorDescription: string;
    };
    TOKEN_KEY: string;
    // format: {
    //     errno: string;
    //     errmsg: string;
    //     data: string;
    //     page: string;
    //     pageSize: string;
    //     currentPage: string;
    //     count: string;
    //     totalPages: string;
    // };
}
function getApiUrl() {
    const ENV = process.env.API_URL;
    let api = '';
    switch (ENV) {
        case 'local':
            api = 'http://laravelweibo.test';
            break;
        case 'dev':
            api = 'http://laravelweibo.test';
            break;
        case 'test':
            api = 'http://laravelweibo.test';
            break;
        case 'pre':
            api = 'http://laravelweibo.test';
            break;
        case 'prod':
            api = 'http://laravelweibo.test';
            break;
        default:
            api = 'http://laravelweibo.test';
    }
    return api;
}
const AppConfig: IConfig = {
    AppName: 'nextjs-weibo',
    theme: {
        title: "weibo",
        author: "Chaos",
        authorDescription: "emm...",
        description: "不断更365是Chaos的个人博客，用来记录chaos的思考。",
        keywords: "博客,互联网博客,个人博客,互联网资讯",
        url: "https://www.buduangeng365.cn",
        subTitle: "keep thinking,keep going.",
        avatar:
            "https://himg.bdimg.com/sys/portrait/item/pp.1.e362bdb9.PYp19GYscDTVWf3o08qoDw.jpg?tt=1579260592789"
    },
    hosts: { api: getApiUrl() },
    // 本地存储token 的key
    TOKEN_KEY: 'Nextjs_Token_key',
    // format: {
    //     errno: "code",
    //     errmsg: "msg",
    //     data: "data",
    //     page: "page",
    //     pageSize: "size",
    //     currentPage: "current",
    //     count: "total",
    //     totalPages: "totalPage"
    // }
};


export default AppConfig;
