import React, { useEffect, useState } from "react";
import Page from "../components/page";
import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import BaseLayout from '../layout/base-layout'
import { Jumbotron, Button, Card, Form, ListGroup, Row, Col, Pagination, Media } from "react-bootstrap";
import * as Yup from 'yup';
import { Formik } from "formik";
import Link from "next/link";
import UserContainer, { UserContainerProps } from "../container/user";
import { postWeibo, apiGetStatusListByUserId } from "../apis/status";
import MyButton from "../components/Button";
import { apiGetUserFeed } from "../apis/user";


interface IProps extends UserContainerProps {
}


const IndexPage = (props: IProps) => {
  const { id } = props;
  const [isSubmit, setSubmit] = useState(false);
  const [feed, setFeed] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [feedTotal, setFeedTotal] = useState(0)

  const schema = Yup.object().shape({
    content:
      Yup.string()
        .max(140)
        .required("Enter content"),
  });
  useEffect(() => {
    id && getFeedList(1)
    return () => {

    }
  }, [])

  const getFeedList = (page) => {
    apiGetUserFeed({ id, page }).then((res: any) => {
      setFeed(res.data)
      setFeedTotal(res.total)
    }).catch(e => { })
  }

  const handleFormSubmit = (values) => {
    const { content } = values
    setSubmit(true)
    postWeibo({ content }).then(() => {
      setSubmit(false)
    }).catch(() => {
      setSubmit(false)
    })

  }
  const onFeedPageChange = (e) => {
    const page = +e.target.text
    setCurrentPage(page)
    getFeedList(page)
  }

  return (
    <>
      <Page title="weibo-find some fun">
        <SocialMeta {...webConfig.theme} />
        <BaseLayout>

          {
            !id && (
              <Row>
                <Col>
                  <Jumbotron>
                    <h1>Hello!</h1>
                    <p>
                      Welcome to Weibo.
            </p>
                    <p>
                      <Button variant="primary" href="/sign-up">Sign Up</Button>

                    </p>
                  </Jumbotron>
                </Col>

              </Row>
            )
          }



          {
            id && (
              <Row>
                <Col>
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
                </Col>
              </Row>
            )
          }



          {id && (
            <Row className="mt-5">
              <Col>
                <ListGroup>
                  {feed.map(feed => (
                    <ListGroup.Item key={feed.id}>
                      <Row>
                        <Col sm={10}>
                          <Link href={`/users/${feed.user_id}`}>
                            <a>{feed.name}</a>
                          </Link>
                          <p>{feed.content}</p>
                        </Col>
                        <Col sm={2}>
                          {id === 1 && feed.user_id !== id && <MyButton variant="danger" onClick={() => this.onDeleteUser(id)}>Delete</MyButton>}
                        </Col>
                      </Row>

                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Pagination className="mt-5 d-flex justify-content-center">
                  {Array.from(String(feed.length), Number).map((page, index) => (
                    <Pagination.Item key={`Pagination-${index}`} active={index + 1 === currentPage} onClick={onFeedPageChange} >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </Col>
            </Row>
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
