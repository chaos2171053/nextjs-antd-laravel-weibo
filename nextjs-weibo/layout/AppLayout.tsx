import React from 'react';
import Header from './header'
import Footer from './footer'
interface IProps {
    children?: React.ReactNode;
}
function BaseLayout(props: IProps) {
    const { children } = props;
    return (
        <>
            <Header />
            {
                children
            }
            <Footer />
        </>
    )
}
export default BaseLayout;