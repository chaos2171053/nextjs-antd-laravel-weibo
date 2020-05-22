import React, { memo } from 'react'
import { connect } from "react-redux";
import { UserState, setUserInfo, logout, dispatchLogin, dispatchSignUp } from '../store/modules/user';

export interface IAuthProps {
    userInfo: UserState;
    children?: React.ReactNode;
    setUserInfo: Function;
    dispatchLogout: Function;
    dispatchLogin: Function;
    dispatchSignUp: Function;
}
const mapStateToProps = state => ({
    ...state.user
});
const mapDispatchToProps = {
    setUserInfo,
    dispatchLogout: logout,
    dispatchLogin,
    dispatchSignUp
};


function UserContainer(WarpperComponent) {

    function UserInfo(props: IAuthProps) {
        return (
            <>
                <WarpperComponent  {...props} />
            </>
        )
    }

    return connect(mapStateToProps, mapDispatchToProps)(UserInfo as any)
}

export default UserContainer;