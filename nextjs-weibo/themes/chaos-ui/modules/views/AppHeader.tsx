import React, { useEffect } from 'react';
import clsx from 'clsx';
import { withStyles, StyledComponentProps } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import { Button, ClickAwayListener, MenuItem, MenuList, Paper, Grow, Popper } from '@material-ui/core';
import { useRouter } from 'next/router'
import WithAuthHoc, { IAuthProps } from '../../../../components/auth-hoc'
interface IProps extends StyledComponentProps, IAuthProps {
}
const styles = (theme) => ({
    title: {
        fontSize: 24,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
    },
    left: {
        flex: 1,
    },
    leftLinkActive: {
        color: theme.palette.common.white,
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: theme.spacing(3),
    },
    linkSecondary: {
        color: theme.palette.secondary.main,
    },
    userInfo: {
        fontSize: 16,
        color: theme.palette.common.white,
        lineHeight: 1.6,
        paddingTop: 0,
        '&:label': {
            lineHeight: 1.6,
            paddingTop: 0,
        }
    },
});


function AppHeader(props: IProps) {
    const { classes, dispatchLogout, userInfo } = props;
    const router = useRouter()
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };
    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, key: string) => {
        switch (key) {
            case 'profile':
                router.push('/profile')
                break;
            case 'userLogout':
                dispatchLogout();
                router.replace('/')
                break;

            default:
                break;
        }

        handleClose(event);
    };

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left} >
                        <Link
                            variant="h6"
                            underline="none"
                            color="inherit"
                            className={classes.title}
                            href="/"
                        >
                            {'Weibo'}
                        </Link>
                    </div>
                    <div className={classes.right}>
                        <Link
                            variant="h6"
                            underline="none"
                            className={classes.rightLink}
                            href="/help"
                        >
                            {'Help'}
                        </Link>
                        {
                            userInfo.token ? null : (
                                <>
                                    <Link
                                        color="inherit"
                                        variant="h6"
                                        underline="none"
                                        className={classes.rightLink}
                                        href="/sign-in"
                                    >
                                        {'Sign In'}
                                    </Link>
                                    <Link
                                        variant="h6"
                                        underline="none"
                                        className={clsx(classes.rightLink, classes.linkSecondary)}
                                        href="/sign-up"
                                    >
                                        {'Sign Up'}
                                    </Link>
                                </>)
                        }
                        {
                            userInfo.token ?
                                <>
                                    <Button
                                        ref={anchorRef}
                                        aria-controls={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                        className={classes.userInfo}
                                    >
                                        {userInfo.email}
                                    </Button>
                                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList autoFocusItem={open} id="menu-list-grow">
                                                            <MenuItem onClick={(event) => handleMenuItemClick(event, 'member')} >Member</MenuItem>
                                                            <MenuItem onClick={(event) => handleMenuItemClick(event, 'profile')} >Profile</MenuItem>
                                                            <MenuItem onClick={(event) => handleMenuItemClick(event, 'userLogout')} >Logout</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </> : null
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder} />
        </div>
    );
}

export default WithAuthHoc(withStyles(styles)(AppHeader))
