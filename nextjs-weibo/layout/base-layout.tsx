import React from 'react';
import Header from './header'
import Footer from './hooter'
import { Container } from 'react-bootstrap';
import '../styles/layout.less'
interface IProps {
    children?: React.ReactNode;
}
function BaseLayout(props: IProps) {
    const { children } = props;
    return (
        <>
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