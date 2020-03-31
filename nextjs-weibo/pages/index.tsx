import React, { useState } from "react";
import Header from "../components/header";

import Page from "../components/page";

import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import withRoot from "../themes/chaos-ui/modules/WithRoot";
import AppAppBar from "../themes/chaos-ui/modules/views/AppAppBar";
import AppFooter from "../themes/chaos-ui/modules/views/AppFooter";


interface IProps {

}



const IndexPage = (props: IProps) => {
  const { } = props;


  return (
    <>
      <Header shadow></Header>
      <Page title="首页 微博-随时随地发现新鲜事">
        <SocialMeta {...webConfig.theme} />
        <AppAppBar />
        <AppFooter />
      </Page>
    </>
  );
};

IndexPage.getInitialProps = async context => {
  return {}
};

export default withRoot(IndexPage);
