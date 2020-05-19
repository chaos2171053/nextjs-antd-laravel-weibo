import React, { useEffect, memo } from 'react'
import { UserState } from '../store/modules/user';
import { useRouter, withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router';

export interface IAuthProps extends WithRouterProps {
    userInfo: UserState;
    children?: React.ReactNode;
    setUserInfo: Function;
    dispatchLogout: Function;
    location: any;
}


function WithAuthHoc(WarpperComponent) {

    function Auth(props: IAuthProps) {
        const { userInfo, children } = props
        const router = useRouter()
        useEffect(() => {
            if (!userInfo.token) {
                router.push(`/sign-in?redirectURL=${encodeURIComponent(
                    window.location.origin +
                    props.location.pathname +
                    props.location.search,
                )}`)
            }
            return () => {

            }
        }, [userInfo.token])
        return (
            <>
                <WarpperComponent  {...props} >
                    {children}
                </WarpperComponent>
            </>
        )
    }

    // TODO 把权限注入
    return withRouter(memo(Auth))
}

export default WithAuthHoc;