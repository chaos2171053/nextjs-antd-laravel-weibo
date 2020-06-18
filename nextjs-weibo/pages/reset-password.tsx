import React, { useState } from 'react'
import Page from '../components/page'
import SocialMeta from '../components/social-meta'
import BaseLayout from '../layout/base-layout'
import webConfig from '../config/config'
import * as Yup from 'yup';
import { Card, Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'

function ResetPasswrod() {
    const [isSubmit, setSubmit] = useState(false);
    const schema = Yup.object().shape({
        email:
            Yup.string()
                .email()
                .required("Enter an email address"),
    });
    const handleFormSubmit = (values) => {
        const { email } = values
        // TODO
        setSubmit(true)
        setSubmit(false)
    }
    return (
        <>
            <Page title="忘记密码-微博-随时随地发现新鲜事">
                <SocialMeta {...webConfig.theme} />
                <BaseLayout>
                    <Card>
                        <Card.Header>Reset Password</Card.Header>
                        <Card.Body>
                            <Formik
                                validationSchema={schema}
                                onSubmit={handleFormSubmit}
                                initialValues={{
                                    email: '',

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
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isValid={touched.email && !errors.email}
                                                />
                                                <Form.Text className='text-danger' >
                                                    {errors.email}
                                                </Form.Text>
                                            </Form.Group>
                                            <Button variant="primary" type="submit" disabled={isSubmit}>
                                                {isSubmit ? 'Sending...' : 'Send'}
                                            </Button>
                                        </Form>)}
                            </Formik>
                        </Card.Body>
                    </Card>
                </BaseLayout>
            </Page>
        </>
    )
}

export default ResetPasswrod