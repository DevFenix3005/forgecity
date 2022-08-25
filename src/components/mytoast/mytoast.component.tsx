import * as React from 'react';

import { connect, ConnectedProps } from "react-redux";

import Alert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { RootState } from '../../redux/store';
import { restartSnackBarState, selectSnackBarState } from '../../redux/info/infoSlice';

const SnackBarContent = React.forwardRef<HTMLDivElement, AlertProps>(function All(props, ref,) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const mapStateToProps = (state: RootState) => {
    let { message, open, status } = selectSnackBarState(state);
    return {
        message,
        open,
        status,
    };
}

const mapDispatchToProps = {
    onCloseSnakBar: () => (restartSnackBarState())
}

const connector2MyToast = connect(mapStateToProps, mapDispatchToProps);

type MyToastPropsFromRedux = ConnectedProps<typeof connector2MyToast>

function MyToast(props: MyToastPropsFromRedux) {

    const hideTime = 6000;

    const onClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.onCloseSnakBar();
    };

    return (
        <Snackbar
            open={props.open}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            autoHideDuration={hideTime}
            onClose={onClose}
        >
            <SnackBarContent onClose={onClose}
                severity={props.status}
                sx={{ width: '100%' }}>
                {props.message}
            </SnackBarContent>
        </Snackbar>
    );
}

export default connector2MyToast(MyToast);

