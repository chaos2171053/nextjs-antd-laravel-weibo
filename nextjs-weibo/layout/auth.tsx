import React, { memo } from 'react';
import Router from 'next/router'
import { getValue } from '../utils/localstorage';
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router';
interface AuthProps extends WithRouterProps {
    location: any;
    children: React.ReactNode;
}
function Auth(props: AuthProps) {
    // 未登录
    if (!getValue('Token')) {
        Router.replace(`/siginup?redirectURL=${encodeURIComponent(
            window.location.origin +
            props.location.pathname +
            props.location.search,
        )}`)
        return;
    }

    return <>{props.children}</>;
}

export default memo(withRouter(Auth));
