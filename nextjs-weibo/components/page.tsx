import React from "react";
import Head from "next/head";

interface IProps {
    title?: string;
    description?: string;
    children?: React.ReactNode;
}

function Page({ title, description, children }: IProps) {
    return (
        <div className="root">
            <Head>
                <title>{title || "weibo-find some fun"}</title>
                {description && (
                    <meta
                        name="description"
                        content={description || "Buduangeng365 is chaos`s blog"}
                    />
                )}
            </Head>
            {children}
        </div>
    );
}

export default Page;
