import React, { useEffect } from "react";
import Page from "../components/page";
import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import AppLayout from '../layout/AppLayout'
import { Jumbotron, Button, Navbar } from "react-bootstrap";
import { withRouter } from "next/router";

interface IProps {
}


const IndexPage = (props: IProps) => {
  const { } = props;
  useEffect(() => {
    return () => {

    }
  }, [])

  return (
    <>
      <Page title="首页 微博-随时随地发现新鲜事">
        <SocialMeta {...webConfig.theme} />
        <AppLayout>
          <Jumbotron>
            <h1>Hello!</h1>
            <p>
              Welcome to Weibo.
            </p>
            <p>
              <Button variant="primary" href="/sign-up">Sign Up</Button>

            </p>
          </Jumbotron>
        </AppLayout>
      </Page>
    </>
  );
};

IndexPage.getInitialProps = async context => {

  return {}
};


export default IndexPage;
