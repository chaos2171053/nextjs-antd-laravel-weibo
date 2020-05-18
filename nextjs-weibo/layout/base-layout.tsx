import React from 'react';
import Header from './header'
import Footer from './hooter'
import { Container } from 'react-bootstrap';
import '../styles/layout.less'
import Progress from "../components/nprogress";
interface IProps {
    children?: React.ReactNode;
}
function BaseLayout(props: IProps) {
    const { children } = props;
    return (
        <>
            <Progress />
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
export default BaseLayout;