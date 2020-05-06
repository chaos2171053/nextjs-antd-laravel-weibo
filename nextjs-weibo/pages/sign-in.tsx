
// --- Post bootstrap -----
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { apiUerSignInByEmailPwd } from '../apis/auth';
import MyAlert from '../components/alert';
import Router from 'next/router'
import { connect } from "react-redux";
import { setUserInfo } from "../store/modules/user";
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

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
    setUserInfo
};
interface IProps {
    setUserInfo: Function;
}

function SignIn(props: IProps) {
    const { setUserInfo } = props
    const classes = useStyles();
    const [sent, setSent] = useState(false);
    const [ajaxMessage, setShowAjaxMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const validate = (values) => {
        const errors = required(['email', 'password'], values);
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
        apiUerSignInByEmailPwd(values).then(res => {
            const params = new URLSearchParams(window.location.search);
            const redirectURL = params.get('redirectURL');
            setSent(false);
            setUserInfo(res)
            if (redirectURL) {
                Router.replace(redirectURL)
                return;
            }
            Router.replace('/')
        }).catch(err => {
            setSent(false);
            setShowAjaxMessage(err)
            setShowAlert(true)
        })
    };


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
            <AppAppBar />
            <AppForm>
                <React.Fragment>
                    <Typography variant="h3" gutterBottom marked="center" align="center">
                        Sign In
                    </Typography>
                </React.Fragment>
                <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
                    {({ handleSubmit, submitting }) => (
                        <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
                                {submitting || sent ? 'In progress…' : 'Sign In'}
                            </FormButton>
                        </form>
                    )}
                </Form>
            </AppForm >
            <AppFooter />
        </React.Fragment >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(SignIn));