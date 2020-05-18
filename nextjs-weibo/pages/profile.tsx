
// --- Post bootstrap -----
import React, { useState, useRef } from 'react';

import { apiUpdateUserPwd } from '../apis/auth';
import WithAuthHoc, { IAuthProps } from '../container/auth'


interface IProps extends IAuthProps {
}

function Profile(props: IProps) {
    const { userInfo } = props


    return (
        <React.Fragment>
            <React.Fragment>
            </React.Fragment>
        </React.Fragment >
    );
}
export default WithAuthHoc(Profile)