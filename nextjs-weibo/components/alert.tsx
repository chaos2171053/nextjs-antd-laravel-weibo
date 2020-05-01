import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertProps, Color } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
            position: 'absolute',
            zIndex: 99999999,
        },
    }),
);

interface IProps extends AlertProps {
    duration?: number;
    show: boolean;
    severity: Color;
    children?: React.ReactNode;
}

export default function MyAlert(props: IProps) {
    const classes = useStyles();
    const { severity = 'success', show = false, duration = 3000, children, ...other } = props;
    const [open, setOpen] = useState(show);

    useEffect(() => {
        setOpen(show)
        return () => {
            setTimeout(() => {
                setOpen(false)
            }, duration)
        }
    }, [show])

    return (
        <Collapse in={open}>
            <div className={classes.root}>
                <Alert
                    severity={severity}
                    onClose={() => { setOpen(false) }}
                    {...other}>
                    {children}
                </Alert>
            </div>
        </Collapse>
    );
}