import React, { useState } from "react";
import Header from "../layout/header";

import Page from "../components/page";

import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";



interface IProps {

}



const AboutPage = (props: IProps) => {
    const { } = props;


    return (
        <>
            <Header shadow></Header>
            <Page title="关于-微博-随时随地发现新鲜事">
                <SocialMeta {...webConfig.theme} />

            </Page>
        </>
    );
};

AboutPage.getInitialProps = async context => {
    return {}
};

export default AboutPage;
