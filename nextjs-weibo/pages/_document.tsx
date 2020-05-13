import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <html lang="zh-Hans">
                <Head>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,

    };
};