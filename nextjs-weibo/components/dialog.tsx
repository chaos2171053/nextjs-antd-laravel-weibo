import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ModalProps } from '@material-ui/core';

interface IProps extends DialogProps {
    open: boolean;
    title?: string;
    handleClose: ModalProps['onClose'];
    handleOk?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    cancelText?: string;
    handleCancel?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    okText?: string;
    children?: React.ReactNode;
}

export default function AlertDialog(props: IProps) {
    const {
        title = '',
        open,
        handleCancel,
        handleClose,
        handleOk,
        cancelText,
        okText,
        children,
        ...others
    } = props


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                {...others}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    {
                        children
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        {cancelText ? cancelText : 'cancel'}
                    </Button>
                    <Button onClick={handleOk} color="primary" autoFocus>
                        {okText ? okText : 'ok'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}