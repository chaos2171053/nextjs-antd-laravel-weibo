import React from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import { Container } from 'react-bootstrap';
import '../styles/layout.less'
import UIContainer from '../container/ui'
import MyToast from '../components/toast'
import { UiState } from '../store/modules/ui'
import UserContainer, { UserContainerProps } from '../container/user'

export interface IProps extends UiState, UserContainerProps {
    setUi?: Function;
    ui?: UiState;
}

function BaseLayout(props) {
    const { children } = props


    function Layout(layoutProps: IProps) {
        const { setUi, ui, dispatchLogout } = layoutProps
        return (
            <>
                <MyToast setUi={setUi}  {...ui} />
                <Header onLogout={dispatchLogout} {...layoutProps} />
                <Container className="pt-5 pb-5">
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