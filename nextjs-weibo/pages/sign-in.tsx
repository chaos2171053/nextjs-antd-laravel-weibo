
// --- Post bootstrap -----
import React, { useState, } from 'react';
import { apiUerSignInByEmailPwd } from '../apis/auth';
import WithAuthHoc, { IAuthProps } from '../container/Auth'
interface IProps extends IAuthProps {
}

function SignIn(props: IProps) {
    const { setUserInfo } = props





    return (
        <React.Fragment>

        </React.Fragment >
    );
}
export default WithAuthHoc(SignIn)