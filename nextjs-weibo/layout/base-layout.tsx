import React from 'react';
import Header from './header'
import Footer from './hooter'
import { Container } from 'react-bootstrap';
import '../styles/layout.less'
import Progress from "../components/nprogress";
import UIContainer from '../container/ui'
import MyToast from '../components/toast'
import { UiState } from '../store/modules/ui'
interface IProps extends UiState {
    children?: any;
    setUi?: Function;
    ui?: UiState;
}
function BaseLayout(props: IProps) {
    const { children, setUi, ui } = props;
    return (
        <>
            <Progress />
            <MyToast setUi={setUi}  {...ui} />
            <Header />
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
export default UIContainer(BaseLayout);