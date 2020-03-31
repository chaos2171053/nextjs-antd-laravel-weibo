interface IConfig {
    hosts: { [key: string]: string };
    successErrno: number;
    authErrno: number;
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
    format: {
        errno: string;
        errmsg: string;
        data: string;
        page: string;
        pageSize: string;
        currentPage: string;
        count: string;
        totalPages: string;
    };
}

const config: IConfig = {
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
    hosts: { api: "" },
    successErrno: 0,
    authErrno: 401,
    format: {
        errno: "code",
        errmsg: "msg",
        data: "data",
        page: "page",
        pageSize: "size",
        currentPage: "current",
        count: "total",
        totalPages: "totalPage"
    }
};

const ENV = process.env.API_URL;

switch (ENV) {
    case "local":
        config.hosts = {
            api: "http://127.0.0.1:8080/api"
        };
        break;
    case "dev":
        config.hosts = {
            api: "http://127.0.0.1:8080/api" // 不能使用 //缺省协议
        };
        break;
    case "test":
        config.hosts = {
            api: "//"
        };
        break;
    case "pre":
        config.hosts = {
            api: "//"
        };
        break;
    case "prod":
        config.hosts = {
            api: "http://www.buduangeng365.cn/api"
        };
        break;
    default:
        config.hosts = {
            api: "http://www.buduangeng365.cn/api"
        };
}

export default config;
