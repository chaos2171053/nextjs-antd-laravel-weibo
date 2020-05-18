import React, { memo, useEffect } from 'react'
import { Toast, ToastProps, Row, Col, Button } from 'react-bootstrap';

import { connect } from "react-redux";
import { setUi } from '../store/modules/ui'
import '../styles/toast.less'

const mapStateToProps = state => ({
    ...state.ui
});
const mapDispatchToProps = {
    setUi
};

export interface IToastProps extends ToastProps {
    showToast?: boolean;
    setUi: Function;
    toastMsg?: string;
    toastTitle?: string;
}

function MyToast(props: IToastProps) {
    const { showToast, setUi, toastMsg, toastTitle } = props

    useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                setUi({ showToast: false })
            }, 3000)
        }
        return () => {

        }
    }, [showToast])
    return (
        <Row className="float-right toast-warpper">
            <Col>
                <Toast onClose={() => setUi({ showToast: false })} show={showToast}>
                    <Toast.Header>
                        <strong className="mr-auto">{toastTitle ? toastTitle : 'Error'}</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body>{toastMsg}</Toast.Body>
                </Toast>
            </Col>
        </Row >
    );
}


export default MyToast