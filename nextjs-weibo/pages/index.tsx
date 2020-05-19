import React, { useEffect } from "react";
import Page from "../components/page";
import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import BaseLayout from '../layout/base-layout'
import { Jumbotron, Button } from "react-bootstrap";

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
      <Page title="weibo-find some fun">
        <SocialMeta {...webConfig.theme} />
        <BaseLayout>
          <Jumbotron>
            <h1>Hello!</h1>
            <p>
              Welcome to Weibo.
            </p>
            <p>
              <Button variant="primary" href="/sign-up">Sign Up</Button>

            </p>
          </Jumbotron>
        </BaseLayout>
      </Page>
    </>
  );
};

IndexPage.getInitialProps = async context => {

  return {}
};


export default IndexPage;
