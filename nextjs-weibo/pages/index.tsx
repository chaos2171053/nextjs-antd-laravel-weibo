import React, { useEffect, useState } from "react";
import Page from "../components/page";
import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import BaseLayout from '../layout/base-layout'
import { Jumbotron, Button, Card, Form } from "react-bootstrap";
import * as Yup from 'yup';
import { Formik } from "formik";
import Link from "next/link";
import UserContainer, { UserContainerProps } from "../container/user";
import { postWeibo } from "../apis/status";


interface IProps extends UserContainerProps {
}


const IndexPage = (props: IProps) => {
  const { id } = props;
  const [isSubmit, setSubmit] = useState(false);

  const schema = Yup.object().shape({
    content:
      Yup.string()
        .max(140)
        .required("Enter content"),
  });
  useEffect(() => {
    return () => {

    }
  }, [])

  const handleFormSubmit = (values) => {
    const { content } = values
    setSubmit(true)
    postWeibo({ content }).then(() => {
      setSubmit(false)
    }).catch(() => {
      setSubmit(false)
    })

  }

  return (
    <>
      <Page title="weibo-find some fun">
        <SocialMeta {...webConfig.theme} />
        <BaseLayout>
          {
            !id && (
              <Jumbotron>
                <h1>Hello!</h1>
                <p>
                  Welcome to Weibo.
            </p>
                <p>
                  <Button variant="primary" href="/sign-up">Sign Up</Button>

                </p>
              </Jumbotron>
            )
          }
          {
            id && (
              <Card>
                <Card.Header>Upload Weibo</Card.Header>
                <Card.Body>
                  <Formik
                    validationSchema={schema}
                    onSubmit={handleFormSubmit}
                    initialValues={{
                      content: '',
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      errors,
                    }) => (
                        <Form
                          noValidate
                          onSubmit={handleSubmit}
                        >
                          <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                              type="content"
                              placeholder="Enter content"
                              name="content"
                              value={values.content}
                              onChange={handleChange}
                              isValid={touched.content && !errors.content}
                            />
                            <Form.Text className='text-danger' >
                              {errors.content}
                            </Form.Text>
                          </Form.Group>
                          <Button variant="primary" type="submit" disabled={isSubmit}>
                            {isSubmit ? 'Loading…' : 'Submit'}
                          </Button>
                        </Form>)}
                  </Formik>
                </Card.Body>
              </Card>
            )
          }
        </BaseLayout>
      </Page>
    </>
  );
};

IndexPage.getInitialProps = async context => {

  return {}
};


export default UserContainer(IndexPage);
