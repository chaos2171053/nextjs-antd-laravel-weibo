
// --- Post bootstrap -----
import React, { useState } from 'react';
import BaseLayout from '../layout/base-layout'

import { Card, Form, Button } from 'react-bootstrap';
import SocialMeta from '../components/social-meta';
import webConfig from '../config/config'
import Page from '../components/page';
import { Formik } from 'formik';
import * as Yup from 'yup';
import UserContainer from '../container/user';
import { UserState } from '../store/modules/user';

interface IProps {
    dispatchUpdateUserProfile: Function;
    userInfo: UserState;
}

function Profile(props: IProps) {
    const { dispatchUpdateUserProfile, userInfo = { name: '' } } = props
    const [isSubmit, setSubmit] = useState(false);
    const schema = Yup.object().shape({
        formBasicName: Yup.string()
            .required()
            .max(20, 'Max  charactors'),
        formBasicEmail:
            Yup.string()
                .email()
                .required("Enter an email address"),
        formBasicPassword:
            Yup.string().required()
                .min(8, 'At least 8 charactors')
                .max(20, 'Max  charactors'),
        formBasicComfirmPassword: Yup.string().required()
            .min(8, 'At least 8 charactors')
            .max(20, 'Max  charactors')
            .oneOf([Yup.ref('formBasicPassword'), null], 'Passwords must match')

    });

    const handleFormSubmit = (values) => {
        const { formBasicName, formBasicEmail, formBasicPassword } = values
        setSubmit(true)
        dispatchUpdateUserProfile({
            id: userInfo.id,
            name: formBasicName,
            email: formBasicEmail,
            password: formBasicPassword
        }).then(res => {
            setSubmit(false)
        }).catch(e => {
            setSubmit(false)
        })
    }

    return (
        <React.Fragment>
            <Page title={`${userInfo.name} - find some fun`}>
                <SocialMeta {...webConfig.theme} />
                <BaseLayout>
                    <Card>
                        <Card.Header>Profile</Card.Header>
                        <Card.Body>
                            <Formik
                                validationSchema={schema}
                                onSubmit={handleFormSubmit}
                                initialValues={{
                                    formBasicName: userInfo.name,
                                    formBasicEmail: '',
                                    formBasicPassword: '',
                                    formBasicComfirmPassword: ''

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
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="formBasicName"
                                                    value={values.formBasicName}
                                                    onChange={handleChange}
                                                    isValid={touched.formBasicName && !errors.formBasicName}
                                                />
                                                {errors.formBasicName && <Form.Text className="text-danger">
                                                    {errors.formBasicName}
                                                </Form.Text>}
                                            </Form.Group>
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
                                                <Form.Text className={errors.formBasicEmail ? 'text-danger' : 'text-muted'}>
                                                    {errors.formBasicEmail ? errors.formBasicEmail : ' We\'ll never share your email with anyone else.'}
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
                                            <Form.Group controlId="formBasicComfirmPassword">
                                                <Form.Label>Comfirm Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="comfirm password"
                                                    name="formBasicComfirmPassword"
                                                    value={values.formBasicComfirmPassword}
                                                    onChange={handleChange}
                                                    isValid={touched.formBasicComfirmPassword && !errors.formBasicComfirmPassword}
                                                />
                                                {errors.formBasicComfirmPassword && <Form.Text className="text-danger">
                                                    {errors.formBasicComfirmPassword}
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

export default UserContainer(Profile);
