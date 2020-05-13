import React from 'react';
import Header from './header'
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
        </>
    )
}
export default BaseLayout;