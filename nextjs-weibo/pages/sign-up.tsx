
// --- Post bootstrap -----
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../themes/chaos-ui/modules/components/Typography';
import AppFooter from '../themes/chaos-ui/modules/views/AppFooter';
import AppAppBar from '../themes/chaos-ui/modules/views/AppHeader';
import AppForm from '../themes/chaos-ui/modules/views/AppForm';
import { email, required } from '../themes/chaos-ui/modules/form/validation';
import RFTextField from '../themes/chaos-ui/modules/form/RFTextField';
import FormButton from '../themes/chaos-ui/modules/form/FormButton';
import FormFeedback from '../themes/chaos-ui/modules/form/FormFeedback';
import withRoot from '../themes/chaos-ui/modules/WithRoot';
import { apiUerSignUp } from '../apis/auth';
import MyAlert from '../components/alert';
import AlertDialog from '../components/dialog';
import { DialogContentText } from '@material-ui/core';
import Router from 'next/router'
import { getValue } from '../utils/localstorage';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(6),
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    feedback: {
        marginTop: theme.spacing(2),
    },
}));


function SignUp() {
    const classes = useStyles();
    const [sent, setSent] = useState(false);
    const [ajaxMessage, setShowAjaxMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [showDialog, setShowDialog] = useState(false)

    const validate = (values) => {
        const errors = required(['name', 'email', 'password'], values);
        if (!errors.email) {
            const emailError = email(values.email);
            if (emailError) {
                errors.email = emailError;
            }
        }
        if (values.password && values.password.length < 8) {
            errors.password = 'password at least has 8 characters'
        }


        return errors;
    };

    const handleSubmit = (values) => {
        setSent(true);
        setShowAlert(false)
        apiUerSignUp(values).then(res => {
            setShowDialog(true)
            setSent(false);
        }).catch(err => {
            setSent(false);
            setShowAjaxMessage(err)
            setShowAlert(true)
        })
    };

    const handleDiloagClose = () => {
        setShowDialog(false)
    }
    useEffect(() => {
        if (getValue('Token')) {
            Router.push('/')
        }
    }, [])

    return (
        <React.Fragment>
            <MyAlert severity='error' show={showAlert}>
                {ajaxMessage}
            </MyAlert>
            <AlertDialog
                open={showDialog}
                handleClose={handleDiloagClose}
                handleCancel={handleDiloagClose}
                handleOk={() => Router.push('/sign-in')}
                title='sign up success!'>
                <DialogContentText>
                    {'Go to login?'}
                </DialogContentText>
            </AlertDialog >
            <AppAppBar />
            <AppForm>
                <React.Fragment>
                    <Typography variant="h3" gutterBottom marked="center" align="center">
                        Sign Up
          </Typography>
                    <Typography variant="body2" align="center">
                        <Link href="/sign-in" underline="always">
                            Already have an account?
            </Link>
                    </Typography>
                </React.Fragment>
                <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
                    {({ handleSubmit, submitting }) => (
                        <form onSubmit={handleSubmit} className={classes.form} noValidate>
                            <Field
                                autoFocus
                                component={RFTextField}
                                autoComplete="Name"
                                fullWidth
                                label="Name"
                                name="name"
                                required
                            />
                            <Field
                                autoComplete="email"
                                component={RFTextField}
                                disabled={submitting || sent}
                                fullWidth
                                label="Email"
                                margin="normal"
                                name="email"
                                required
                            />
                            <Field
                                fullWidth
                                component={RFTextField}
                                disabled={submitting || sent}
                                required
                                name="password"
                                autoComplete="current-password"
                                label="Password"
                                type="password"
                                margin="normal"
                            />
                            <FormSpy subscription={{ submitError: true }}>
                                {({ submitError }) =>
                                    submitError ? (
                                        <FormFeedback className={classes.feedback} error>
                                            {submitError}
                                        </FormFeedback>
                                    ) : null
                                }
                            </FormSpy>
                            <FormButton
                                className={classes.button}
                                disabled={submitting || sent}
                                color="secondary"
                                fullWidth
                            >
                                {submitting || sent ? 'In progress…' : 'Sign Up'}
                            </FormButton>
                        </form>
                    )}
                </Form>
            </AppForm >
            <AppFooter />
        </React.Fragment >
    );
}

export default withRoot(SignUp);
