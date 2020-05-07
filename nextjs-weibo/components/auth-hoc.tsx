import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { UserState, setUserInfo } from '../store/modules/user';
import { useRouter } from 'next/router'
interface IProps {
    userInfo: UserState;
    children?: React.ReactNode;
    setUserInfo: Function;
}
const mapStateToProps = state => ({
    userInfo: state.user
});
const mapDispatchToProps = {
    setUserInfo
};


function WithAuthHoc(WarpperComponent) {

    function Auth(props: IProps) {
        const { userInfo, setUserInfo } = props
        const auths = {
            userInfo,
            setUserInfo
        }
        const router = useRouter()
        useEffect(() => {
            if (!userInfo.token) {
                router.push('/sign-in')
            }
            return () => {

            }
        }, [userInfo])
        return (
            <>
                <WarpperComponent  {...auths} />
            </>
        )
    }

    return connect(mapStateToProps, mapDispatchToProps)(Auth)
}

export default WithAuthHoc;