
// --- Post bootstrap -----
import React, { useState, } from 'react';
import BaseLayout from '../layout/base-layout'
import { apiUerSignInByEmailPwd } from '../apis/auth';
import { Card, Form, Button } from 'react-bootstrap';
import SocialMeta from '../components/social-meta';
import webConfig from '../config/config'
import Page from '../components/page';
import { Formik } from 'formik';
import * as Yup from 'yup';
import UIContainer from '../container/ui'
import { useRouter } from 'next/router'
import LoginUserInfo from '../container/login-user-info';
interface IProps {
    setUi: Function;
    setUserInfo: Function;
}

function SignIn(props: IProps) {
    const { setUserInfo, setUi } = props
    const [isSubmit, setSubmit] = useState(false);
    const router = useRouter()
    const schema = Yup.object().shape({
        formBasicEmail:
            Yup.string()
                .email()
                .required("Enter an email address"),
        formBasicPassword:
            Yup.string().required()
                .min(8, 'At least 8 charactors')
                .max(20, 'Max  charactors'),

    });

    const handleFormSubmit = (values) => {
        const { formBasicEmail, formBasicPassword } = values
        setSubmit(true)
        apiUerSignInByEmailPwd({
            email: formBasicEmail,
            password: formBasicPassword
        }).then(res => {
            const params = new URLSearchParams(window.location.search);
            const redirectURL = params.get('redirectURL');
            let href = '/'
            setUserInfo(res)
            if (redirectURL) {
                href = redirectURL
            }
            router.replace(href)
        }).catch(e => {
            setSubmit(false)
            setUi({ showToast: true, toastMsg: e })
        })
    }





    return (
        <React.Fragment>
            <Page title="sign in -find some fun">
                <SocialMeta {...webConfig.theme} />
                <BaseLayout>
                    <Card>
                        <Card.Header>Sign In</Card.Header>
                        <Card.Body>
                            <Formik
                                validationSchema={schema}
                                onSubmit={handleFormSubmit}
                                initialValues={{
                                    formBasicEmail: '',
                                    formBasicPassword: '',

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
                                                    name="formBasicEmail"
                                                    value={values.formBasicEmail}
                                                    onChange={handleChange}
                                                    isValid={touched.formBasicEmail && !errors.formBasicEmail}
                                                />
                                                <Form.Text className='text-danger' >
                                                    {errors.formBasicEmail}
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    name="formBasicPassword"
                                                    value={values.formBasicPassword}
                                                    onChange={handleChange}
                                                    isValid={touched.formBasicPassword && !errors.formBasicPassword}
                                                />
                                                {errors.formBasicPassword && <Form.Text className="text-danger">
                                                    {errors.formBasicPassword}
                                                </Form.Text>}
                                            </Form.Group>
                                            <Button variant="primary" type="submit" disabled={isSubmit}>
                                                {isSubmit ? 'Loading…' : 'Submit'}
                                            </Button>
                                        </Form>)}
                            </Formik>
                        </Card.Body>
                    </Card>
                </BaseLayout>
            </Page>
        </React.Fragment >
    );
}
export default LoginUserInfo(UIContainer(SignIn))