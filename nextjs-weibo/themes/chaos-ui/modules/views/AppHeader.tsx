import React from 'react';
import clsx from 'clsx';
import { withStyles, StyledComponentProps } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import { UserState } from '../../../../store/modules/user';
import { getValue } from '../../../../utils/localstorage';

interface IProps extends StyledComponentProps {

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
});


function AppHeader(props: IProps) {
    const { classes } = props;
    const token = getValue('Token')

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left} />
                    {/* <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        className={classes.title}
                        href="/premium-themes/onepirate/"
                    >
                        {'onepirate'}
                    </Link> */}
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
                            token ? null : (
                                <>
                                    <Link
                                        color="inherit"
                                        variant="h6"
                                        underline="none"
                                        className={classes.rightLink}
                                        href="/signin/"
                                    >
                                        {'Sign In'}
                                    </Link>
                                    <Link
                                        variant="h6"
                                        underline="none"
                                        className={clsx(classes.rightLink, classes.linkSecondary)}
                                        href="/signup"
                                    >
                                        {'Sign Up'}
                                    </Link>
                                </>)
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder} />
        </div>
    );
}


export default withStyles(styles)(AppHeader);
