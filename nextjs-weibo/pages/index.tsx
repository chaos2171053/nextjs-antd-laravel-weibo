import React, { useEffect } from "react";
import Page from "../components/page";
import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import AppLayout from '../layout/AppLayout'
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
      <Page title="首页 微博-随时随地发现新鲜事">
        <SocialMeta {...webConfig.theme} />
        <AppLayout>
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
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
