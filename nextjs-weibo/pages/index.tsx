import React, { useEffect } from "react";
import Header from "../components/header";

import Page from "../components/page";

import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import { connect } from "react-redux";


interface IProps {
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

const IndexPage = (props: IProps) => {
  const { } = props;
  useEffect(() => {
    return () => {

    }
  }, [])

  return (
    <>
      <Header shadow></Header>
      <Page title="首页 微博-随时随地发现新鲜事">
        <SocialMeta {...webConfig.theme} />
      </Page>
    </>
  );
};

IndexPage.getInitialProps = async context => {

  return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
