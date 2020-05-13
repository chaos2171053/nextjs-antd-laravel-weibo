
// --- Post bootstrap -----
import React, { useState, useRef } from 'react';
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
import { apiUpdateUserPwd } from '../apis/auth';
import MyAlert from '../components/alert';
import WithAuthHoc, { IAuthProps } from '../components/auth-hoc'
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

interface IProps extends IAuthProps {
}

function Profile(props: IProps) {
    const { userInfo } = props
    const classes = useStyles();
    const [sent, setSent] = useState(false);
    const [ajaxMessage, setShowAjaxMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const formRef = useRef(null);

    const validate = (values) => {
        const errors = required(['email', 'oldPassword', 'newPassword'], values);
        if (!errors.email) {
            const emailError = email(values.email);
            if (emailError) {
                errors.email = emailError;
            }
        }
        if (values.oldPassword && values.oldPassword.length < 8) {
            errors.oldPassword = 'password at least has 8 characters'
        }
        if (values.newPassword && values.newPassword.length < 8) {
            errors.newPassword = 'password at least has 8 characters'
        }
        if (values.newPassword !== values.oldPassword) {
            errors.newPassword = 'passwords are not equal'
        }


        return errors;
    };

    const handleSubmit = (values) => {
        const { email, name, id } = userInfo
        const params = {
            email,
            name,
            password: values.newPassword
        }
        setSent(true);
        setShowAlert(false)
        apiUpdateUserPwd(id, params).then(res => {
            setShowAjaxMessage('更新成功')
            setShowAlert(true)
        }).catch(err => {
            setSent(false);
            setShowAjaxMessage(err)
            setShowAlert(true)
        })
    };


    return (
        <React.Fragment>
            <MyAlert severity='error' show={showAlert}>
                {ajaxMessage}
            </MyAlert>
            <AppAppBar />
            <AppForm>
                <React.Fragment>
                    <Typography variant="h3" gutterBottom marked="center" align="center">
                        Update Profile
                    </Typography>
                </React.Fragment>
                <Form
                    onSubmit={handleSubmit}
                    subscription={{ submitting: true }}
                    validate={validate}
                    initialValues={{ email: userInfo.email }}
                >
                    {({ handleSubmit, submitting, form: { reset } }) => (
                        <form onSubmit={handleSubmit} className={classes.form} noValidate>
                            <Field
                                autoComplete="email"
                                component={RFTextField}
                                disabled={true}
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
                                name="oldPassword"
                                autoComplete="old-password"
                                label="Old Password"
                                type="password"
                                margin="normal"

                            />
                            <Field
                                fullWidth
                                component={RFTextField}
                                disabled={submitting || sent}
                                required
                                name="newPassword"
                                autoComplete="new-password"
                                label="New Password"
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
                                {submitting || sent ? 'In progress…' : 'Update'}
                            </FormButton>
                        </form>
                    )}
                </Form>
            </AppForm >
            <AppFooter />
        </React.Fragment >
    );
}
export default WithAuthHoc(withRoot(Profile))