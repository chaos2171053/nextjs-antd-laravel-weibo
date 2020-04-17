
// --- Post bootstrap -----
import React from 'react';
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
import { apiUerSignIn } from '../apis/auth';
import Router from 'next/router'
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
    const [sent, setSent] = React.useState(false);

    const validate = (values) => {
        const errors = required(['name', 'email', 'password'], values);
        if (!errors.email) {
            const emailError = email(values.email);
            if (emailError) {
                errors.email = emailError;
            }
        }

        return errors;
    };

    const handleSubmit = (values) => {
        setSent(true);
        // postSignUp(values).then(() => {
        //     Router.replace('/')
        // })
    };

    return (
        <React.Fragment>
            <AppAppBar />
            <AppForm>
                <React.Fragment>
                    <Typography variant="h3" gutterBottom marked="center" align="center">
                        Sign Up
          </Typography>
                    <Typography variant="body2" align="center">
                        <Link href="/premium-themes/onepirate/sign-in/" underline="always">
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
            </AppForm>
            <AppFooter />
        </React.Fragment>
    );
}

// TODO 实现HOC如果已经登录，跳转到首页
export default withRoot(SignUp);
