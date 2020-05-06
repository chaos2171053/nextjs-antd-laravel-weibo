import React from "react";
import Progress from "../components/nprogress";
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import store from '../store/index';
//makeStore function that returns a new store for every request
const makeStore = () => store;


function MyApp({ Component, pageProps }) {
    return (
        <>
            <Progress />
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>

        </>
    );
}

MyApp.getInitialProps = async (application) => {
    // 全局解析cookies注入ctx https://segmentfault.com/a/1190000017188709
    const { Component, ctx } = application;
    // let cookies = {};
    let pageProps = {};
    // if (ctx.isServer) {
    //     cookies = parseCookies(ctx);
    // }
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({ ctx });
    }
    return { ...pageProps };
};
export default withRedux(makeStore)(MyApp);
