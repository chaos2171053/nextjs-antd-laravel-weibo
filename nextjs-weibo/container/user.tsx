import React, { memo } from 'react'
import { connect } from "react-redux";
import { UserState, setUserInfo, logout, dispatchLogin, dispatchSignUp, dispatchUpdateUserProfile, dispatchComfirmUserEmail } from '../store/modules/user';

export interface UserContainerProps {
    userInfo: UserState;
    children?: React.ReactNode;
    setUserInfo: Function;
    dispatchLogout: Function;
    dispatchLogin: Function;
    dispatchSignUp: Function;
    dispatchUpdateUserProfile: Function;
    dispatchComfirmUserEmail: Function; //  TOOD,优化dispatch导出到统一index文件
}
const mapStateToProps = state => ({
    ...state.user
});
const mapDispatchToProps = {
    setUserInfo,
    dispatchLogout: logout,
    dispatchLogin,
    dispatchSignUp,
    dispatchUpdateUserProfile,
    dispatchComfirmUserEmail
};


function UserContainer(WarpperComponent) {

    function UserInfo(props: UserContainerProps) {
        return (
            <>
                <WarpperComponent  {...props} />
            </>
        )
    }

    return connect(mapStateToProps, mapDispatchToProps)(UserInfo as any)
}

export default UserContainer;