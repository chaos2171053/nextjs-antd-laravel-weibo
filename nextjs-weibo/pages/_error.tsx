import React, { useState } from "react";

import Page from "../components/page";

import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import BaseLayout from '../layout/base-layout'
import { Jumbotron, Button } from "react-bootstrap";


interface IProps {

}



const AboutPage = (props: IProps) => {
    const { } = props;


    return (
        <>
            <Page title="404-weibo-find some fun">
                <SocialMeta {...webConfig.theme} />
                <BaseLayout>
                    <Jumbotron>
                        <h1>Hello!</h1>
                        <p>
                            404 not found.
                        </p>
                        <p>
                            <Button variant="primary" href="/">Back to home</Button>

                        </p>
                    </Jumbotron>
                </BaseLayout>
            </Page>
        </>
    );
};

AboutPage.getInitialProps = async context => {
    return {}
};

export default AboutPage;
