import React, { useEffect, memo } from 'react'
import { UserState } from '../store/modules/user';
import { useRouter, withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router';
import UserContainer from './user';

export interface IAuthProps extends WithRouterProps {
    userInfo: UserState;
    children?: React.ReactNode;
    setUserInfo: Function;
    dispatchLogout: Function;
    location: any;
    activated: number;
    id: number;
}


function WithAuthHoc(WarpperComponent) {

    function Auth(props: IAuthProps) {
        const { children, id, activated } = props
        const router = useRouter()
        useEffect(() => {

            if (!id) {
                router.push(`/sign-in?redirectURL=${encodeURIComponent(
                    window.location.origin +
                    router.pathname +
                    window.location.search,
                )}`)
                return
            }
            if (!activated) {
                router.push(`/comfirm`)
                return
            }
            return () => {

            }
        }, [])
        return (
            <>
                <WarpperComponent  {...props} >
                    {children}
                </WarpperComponent>
            </>
        )
    }

    // TODO 把权限注入
    return withRouter(memo(UserContainer(Auth)))
}

export default WithAuthHoc;