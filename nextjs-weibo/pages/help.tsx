import React, { useState } from "react";
import Header from "../layout/header";

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
            <Page title="Help-Weibo-find some fun">
                <SocialMeta {...webConfig.theme} />

            </Page>
        </>
    );
};

HelpPage.getInitialProps = async context => {
    return {}
};

export default HelpPage;
