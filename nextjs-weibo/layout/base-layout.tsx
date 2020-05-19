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
    children?: any;
    setUi?: Function;
    ui?: UiState;
}
function BaseLayout(props: IProps) {
    const { children, setUi, ui, userInfo, dispatchLogout } = props;
    return (
        <>
            <Progress />
            <MyToast setUi={setUi}  {...ui} />
            <Header {...userInfo} onLogout={dispatchLogout} />
            <Container>
                <div className="container__body">
                    {
                        children
                    }
                </div>
            </Container>

            <Footer />
        </>
    )


}
export default UserContainer(UIContainer(BaseLayout));