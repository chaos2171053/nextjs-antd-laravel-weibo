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
                <title>{title || "微博-随时随地发现新鲜事"}</title>
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
