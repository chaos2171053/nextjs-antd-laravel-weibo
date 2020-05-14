import React, { memo } from 'react'
import { connect } from "react-redux";
import { UserState, setUserInfo, logout } from '../store/modules/user';

export interface IAuthProps {
    userInfo: UserState;
    children?: React.ReactNode;
    setUserInfo: Function;
    dispatchLogout: Function;
}
const mapStateToProps = state => ({
    userInfo: state.user
});
const mapDispatchToProps = {
    setUserInfo,
    dispatchLogout: logout
};


function LoginUserInfo(WarpperComponent) {

    function UserInfo(props: IAuthProps) {
        return (
            <>
                <WarpperComponent  {...props} />
            </>
        )
    }

    return connect(mapStateToProps, mapDispatchToProps)(memo(UserInfo))
}

export default LoginUserInfo;