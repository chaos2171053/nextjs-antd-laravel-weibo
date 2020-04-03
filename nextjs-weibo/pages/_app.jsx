import React from "react";
import App from "next/app";
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

MyApp.getInitialProps = async (ctx) => {
    const pageProps = await App.getInitialProps(ctx);
    return { ...pageProps };
};

export default withRedux(makeStore)(MyApp);
