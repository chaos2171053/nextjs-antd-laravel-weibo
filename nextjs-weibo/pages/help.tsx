import React, { useState } from "react";
import Header from "../components/header";

import Page from "../components/page";

import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";



interface IProps {

}



const HelpPage = (props: IProps) => {
    const { } = props;


    return (
        <>
            <Header shadow></Header>
            <Page title="帮助-微博-随时随地发现新鲜事">
                <SocialMeta {...webConfig.theme} />

            </Page>
        </>
    );
};

HelpPage.getInitialProps = async context => {
    return {}
};

export default HelpPage;
