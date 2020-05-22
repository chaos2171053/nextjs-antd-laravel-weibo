import React from 'react';
import Header from './header'
import Footer from './footer'
import { Container } from 'react-bootstrap';
import '../styles/layout.less'
import Progress from "../components/nprogress";
import UIContainer from '../container/ui'
import MyToast from '../components/toast'
import { UiState } from '../store/modules/ui'
import UserContainer, { IAuthProps } from '../container/user'

export interface IProps extends UiState, IAuthProps {
    setUi?: Function;
    ui?: UiState;
}

function BaseLayout(props) {
    const { children } = props


    function Layout(layoutProps: IProps) {
        const { setUi, ui, userInfo, dispatchLogout } = layoutProps
        return (
            <>
                <Progress />
                <MyToast setUi={setUi}  {...ui} />
                <Header {...userInfo} onLogout={dispatchLogout} />
                <Container>
                    {
                        children
                    }
                </Container>
                <Footer />
            </>
        )
    }
    const WithAuthUILayout = UserContainer(UIContainer(Layout))
    return (
        <>
            <WithAuthUILayout />
        </>
    )
}

export default BaseLayout