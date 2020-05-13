import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { UserState, setUserInfo, logout } from '../store/modules/user';
import { useRouter } from 'next/router'
export interface IAuthProps {
    userInfo: UserState;
    children?: React.ReactNode;
    setUserInfo: Function;
    dispatchLogout: Function
}
const mapStateToProps = state => ({
    userInfo: state.user
});
const mapDispatchToProps = {
    setUserInfo,
    dispatchLogout: logout
};


function WithAuthHoc(WarpperComponent) {

    function Auth(props: IAuthProps) {
        const { userInfo, setUserInfo, dispatchLogout } = props
        const auths = {
            userInfo,
            setUserInfo,
            dispatchLogout
        }
        const router = useRouter()
        useEffect(() => {
            if (!userInfo.token) {
                router.push('/sign-in')
            }
            return () => {

            }
        }, [userInfo.token])
        return (
            <>
                <WarpperComponent  {...auths} />
            </>
        )
    }

    return connect(mapStateToProps, mapDispatchToProps)(Auth)
}

export default WithAuthHoc;