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
    showToast: boolean;
    setUi: Function;
    toatMsg: string;
    toastTitle: string;
}

function MyToast(props: IToastProps) {
    const { showToast, setUi, toatMsg, toastTitle } = props

    useEffect(() => {
        if (showToast) {
            // setTimeout(() => {
            //     setUi({ showToast: false })
            // }, 3000)
        }
        return () => {

        }
    }, [showToast])
    return (
        <Row className="float-right toast-warpper">
            <Col>
                <Toast onClose={() => setUi({ showToast: false })} show={showToast}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded mr-2"
                            alt=""
                        />
                        <strong className="mr-auto">{toastTitle}</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body>{toatMsg}</Toast.Body>
                </Toast>
            </Col>
        </Row >
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(memo(MyToast))